//var location=require("./dataBase").location
//  , distance=require("./dataBase").distance;

function Queue(){
  var items=[];
  this.push=function push(element){
    item.push(element);
  }
  this.pop=function pop(element){
    return item.shift();
  }
  this.front=function(){
    return items[0];
  }
  this.isEmpty=function(){
    return items.length==0;
  }
  this.clear=function(){
    items=[];
  }
  this.size=function(){
    return items.length;
  }
  this.toString=function(){
    return items.toString();
  }
}

module.exports=function findMinDistance(start,end,distance,callback){
  //console.log("kk");
  var l=distance.length;
  var dist=new Array(l),path=new Array(l),visit=new Array(l);
  for(var i=0;i<l;i++) {
    if(distance[start][i]==-1) {
      dist[i]=Number.POSITIVE_INFINITY;
      path[i]=i;
    }
    else {
      dist[i]=distance[start][i];
      path[i]=start;
    }
    visit[i]=0;
  }
  //console.log(visit,dist);
  dist[start]=0;
  visit[start]=1;
  while(true){
    //console.log("kk");
    var min=Number.POSITIVE_INFINITY,minv=-1;
    for(var i=0;i<l;i++){
      if(visit[i]==0&&min>dist[i]){
        min=dist[i];
        minv=i;
      }
    }
    //    console.log("kk");
    if(minv==-1) break;
    visit[minv]=1;
    for(var i=0;i<l;i++){
      var mindis;
      if(distance[minv][i]==-1){
        mindis=min+Number.POSITIVE_INFINITY;
      }else{
        mindis=min+distance[minv][i];
      }
      if((visit[i]==0)&&mindis<dist[i]){
        path[i]=minv;
        dist[i]=mindis;
      }
    }
  }
  //    console.log("kk");
  var output={};
  output.distance=dist[end];
//  console.log("kk");
  var temp=end,outputPath=[temp];
  //console.log(path);
  while(path[temp]!=temp){
    outputPath.push(path[temp]);
    temp=path[temp];
  }
//  path.reverse();
  output.path=outputPath;
//  console.log("kk");
  callback(null,output);
}
