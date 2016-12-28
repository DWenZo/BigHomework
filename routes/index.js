var express = require('express');
// var findMinDistance=require("../model/findMinDistance");
var findMinDistanceV2=require("../model/findMinDistanceV2");
var getDistance=require("../model/getDistance");
// var Map=require("../model/Map");
var router = express.Router();
var LMap=require("../model/LMap");
// LMap.changeOldMap(function(err){
//   if(err){
//     console.log(err);
//   }
// })
//
/* GET home page. */
router.use(getDistance);
// router.get("/",function(req,res,next){
//   Map.getAllPlace(function(err,places){
//     res.set('Content-Type','application/json;charset=UTF-8');
//     var out={};
//     out.places=places;
//     out.distance=res.distance;
//     res.send(out);
//   });
// });
router.get("/v",function(req,res,next){
  LMap.getAllPlace(function(err,places){
    res.set('Content-Type','application/json;charset=UTF-8');
    var out={};
    out.places=places;
    out.distance=res.cdistance;
    res.send(out);
  });
});

// router.get("/lat/:lat/lng/:lng/name/:name",function(req,res,next){
//   var amap={
//     name:req.params.name,
//     lat:parseFloat(req.params.lat),
//     lng:parseFloat(req.params.lng)
//   }
//   var map=new Map(amap);
//   Map.get(map,function(err,doc){
//     if(err){
//       console.log(err);
//     }
//     res.set('Content-Type','application/json;charset=UTF-8');
//     if(!doc){
//       map.save(function(err,distance){
//         if(err){
//           console.log(err);
//         }
//         res.distance=distance;
//         res.send(res.distance);
//       });
//     }else{
//       res.send(res.distance);
//     }
//   });
// });
router.get("/v/lat/:lat/lng/:lng/name/:name",function(req,res,next){
  var amap={
    name:req.params.name,
    lat:parseFloat(req.params.lat),
    lng:parseFloat(req.params.lng)
  }
  var map=new LMap(amap);
  LMap.get(map,function(err,doc){
    if(err){
      console.log(err);
    }
    res.set('Content-Type','application/json;charset=UTF-8');
    if(!doc){
      console.log("nonhasone")
      map.save(function(err,distance){
        if(err){
          console.log(err);
        }
        res.cdistance=distance;
        res.send(res.cdistance);
      });
    }else{
      console.log("hasone")
      res.send(res.cdistance);
    }
  });
});

// router.get('/s/:start/e/:end', function(req, res, next) {
// //  console.log(res.distance);
//   findMinDistance(parseInt(req.params.start),parseInt(req.params.end),res.distance,function(err,output){
//     if(err){
//       console.log(err);
//     }
//     res.set('Content-Type','application/json;charset=UTF-8');
//     res.send(output);
//   })
// });
// router.get('/v/s/:start/e/:end', function(req, res, next) {
// //  console.log(res.distance);
//   findMinDistanceV2(parseInt(req.params.start),parseInt(req.params.end),res.cdistance,function(err,output){
//     if(err){
//       console.log(err);
//     }
//     res.set('Content-Type','application/json;charset=UTF-8');
//     res.send(output);
//   })
// });

// router.get('/places',function(req,res,next){
//   Map.getAllPlace(function(err,places){
//     res.set('Content-Type','application/json;charset=UTF-8');
//     res.send(places);
//   })
// })
router.get('/v/places',function(req,res,next){
  LMap.getAllPlace(function(err,places){
    res.set('Content-Type','application/json;charset=UTF-8');
    res.send(places);
  })
})



module.exports = router;
