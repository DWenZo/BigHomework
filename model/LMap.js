var MongoClient=require("mongodb").MongoClient
  , url="mongodb://localhost:27017/lMap"
  , oldurl="mongodb://localhost:27017/map"
  , baidumapUrl="http://api.map.baidu.com/routematrix/v2/walking?"
  , ak="w3oXNltDRlgIwffA1wh3SRQGIVPc89aG"
  , request=require("request")
  , eventproxy=require("eventproxy");

function Map(aMap){
  this.name=aMap.name;//名字
  this.lat=aMap.lat;//纬度
  this.lng=aMap.lng;//经度
}

module.exports=Map;

// Map.changeOldMap=function(callback){
//   MongoClient.connect(oldurl,function(err,db){
//     if(err){
//       return callback(err);
//     }
//     db.collection("placeMessage",function(err,collection){
//       if(err){
//         db.close();
//         return callback(err);
//       }
//       collection.find().sort({aid:1}).toArray(function(err,places){
//         db.close();
//         if(err){
//           return callback(err);
//         }
//         var lengthOfPlaces=places.length;
//         MongoClient.connect(url,function(err,ndb){
//           if(err){
//             return callback(err);
//           }
//           ndb.collection("placeMessage",function(err,ncollection){
//             if(err){
//               ndb.close();
//               return callback(err);
//             }
//             ep=new eventproxy();
//             ep.after("place_changed",lengthOfPlaces,function(distances){
//               ndb.close();
//               callback(err,distances);
//             });
//             places.forEach(function(place,index){
//               var cplace={
//                 name:place.name,
//                 lat:place.lat,
//                 lng:place.lng,
//                 aid:place.aid,
//                 cid:place.lat+","+place.lng
//               };
//               var lengthOfplaceDistance=place.distance.length;
//               cplace.distance=[];
//               for(var i=1;i<lengthOfplaceDistance;i++){
//                 if(place.distance[i]==-1) continue;
//                 var edge={
//                   aid:i,
//                   weight:place.distance[i]
//                 }
//                 cplace.distance.push(edge);
//               }
//               ncollection.insert(cplace,{safe:true},function(err,result){
//                 if(err){
//                   return callback(err)
//                 }
//                 ep.emit("place_changed",cplace);
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// }
//
Map.prototype.save=function save(callback){
  var that=this;
  MongoClient.connect(url,function(err,db){
    if(err){
      return callback(err);
    }
    db.collection("placeMessage",function(err,collection){
      if(err){
        db.close();
        return callback(err);
      }
      collection.find().sort({aid:1}).toArray(function(err,places){
        if(err){
          db.close();
          return callback(err);
        }
        var numOfplaces=places.length;
        var amap={
          name:that.name,
          lat:that.lat,
          lng:that.lng,
          aid:numOfplaces,
          cid:that.lat+","+that.lng
        };
        var coordinates=[];
        places.forEach(function(item){
          var coordinate=item.lat+","+item.lng;
          coordinates.push(coordinate);
        });
        if(coordinates.length!=0){
          var destinations=coordinates.join("|");
        //  console.log(destinations);
          var origins=that.lat+","+that.lng;
          var caculateUrl=baidumapUrl+"origins="+origins+"&destinations="+destinations+"&output=json&ak="+ak;
          var distance=[];
          places.forEach(function(item){
            distance.push(item.distance);
          });
        //  console.log(caculateUrl);
          request(caculateUrl,function(err,response,body){
            if(err){
              db.close();
              return callback(err);
            }
            if(response.statusCode!=200){
              db.close();
              return callback("response.statusCode!=200!");
            }
            var data=JSON.parse(body);
            if(data.status!=0){
              db.close();
              return callback("data.status!=0!");
            }
            var lastPlaceDistance=[];
            data.result.forEach(function(item,index){
              if(item.distance.value<=300){
                lastPlaceDistance.push({
                  aid:index,
                  weight:item.distance.value
                });
                places[index].distance.push({
                  aid:amap.aid,
                  weight:item.distance.value
                });
              }
            });
            distance.push(lastPlaceDistance);
            amap.distance=lastPlaceDistance;
            for(var i=0;i<places.length;i++){
              var j=i;
              collection.updateOne({aid:j},places[j],function(err,res){
                if(err){
                  db.close();
                  return callback(err);
                }
              });
            }
            collection.insert(amap,{safe:true},function(err,result){
              db.close();
              callback(err,distance);
            });
          });
        }else{
          amap.distance=[];
          collection.insert(amap,{safe:true},function(err,result){
            db.close();
            callback(err,[0]);
          });
        }
      });
    });
  });
};
Map.get=function get(amap,callback){
  MongoClient.connect(url,function(err,db){
    if(err){
      return callback(err);
    }
    db.collection("placeMessage",function(err,collection){
      if(err){
        db.close();
        return callback(err);
      }
      var cidMessage=amap.lat+","+amap.lng;
      collection.findOne({cid:cidMessage},function(err,doc){
        db.close();
        if(doc){
          map=new Map(doc);
          callback(null,map);
        }else{
          callback(err,null);
        }
      });
    });
  });
};

Map.getAllPlace=function getAllPlace(callback){
  MongoClient.connect(url,function(err,db){
    if(err){
      return callback(err);
    }
    db.collection("placeMessage",function(err,collection){
      if(err){
        db.close();
        return callback(err);
      }
      collection.find().sort({aid:1}).toArray(function(err,places){
        db.close();
        if(err){
          callback(err);
        }
        var messagesOfPlaces=[];
        places.forEach(function(item){
          var messageOfPlace={
            name:item.name,
            aid:item.aid,
            lat:item.lat,
            lng:item.lng
          }
          messagesOfPlaces.push(messageOfPlace);
        });
        callback(err,messagesOfPlaces);
      });
    });
  });
};

Map.getDistance=function getDistance(callback){
  MongoClient.connect(url,function(err,db){
    if(err){
      return callback(err);
    }
    db.collection("placeMessage",function(err,collection){
      if(err){
        db.close();
        return callback(err);
      }
      collection.find().sort({aid:1}).toArray(function(err,places){
        db.close();
        if(err){
          callback(err);
        }
        var messagesOfDistance=[];
        places.forEach(function(item){
          messagesOfDistance.push(item.distance);
        });
        callback(err,messagesOfDistance);
      });
    });
  });
};
