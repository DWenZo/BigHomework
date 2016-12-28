function Queue(){
  var items=[];
  var heapUp=function heapUp(pos){
    while(pos!=0){
      if(items[pos].weight>=items[parseInt((pos-1)/2)].weight||items[pos].weight==-1) break;
      var temp=items[pos];
      items[pos]=items[parseInt((pos-1)/2)];
      items[parseInt((pos-1)/2)]=temp;
      pos=parseInt((pos-1)/2);
    }
  }
  var heapDown=function heapDown(pos){
    var lengthOfItems=items.length;
    while(pos*2+1<lengthOfItems){
      pos=pos*2+1;
      if(pos<lengthOfItems-1&&(items[pos].weight>items[pos+1].weight||items[pos].weight==-1)) ++pos;
      if(items[pos].weight<items[parseInt((pos-1)/2)].weight||items[parseInt((pos-1)/2)].weight==-1){
        var temp=items[pos];
        items[pos]=items[parseInt((pos-1)/2)];
        items[parseInt((pos-1)/2)]=temp;
      }else{
        break;
      }
    }
  }
  this.push=function push(element){
    items.push(element);
    heapUp(items.length-1);
  }

  this.pop=function pop(element){
    console.log(items);
    var temp=items[0];
    var pos=items.length-1;
    items[0]=items[pos];
    items[pos]=temp;
    items.pop();
    heapDown(0);
    return temp;
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

module.exports=function findMinDistanceV2(start,end,distance,callback){
  var lengthOfDistance=distance.length;
  var dist=new Array(lengthOfDistance),path=new Array(lengthOfDistance),visit=new Array(lengthOfDistance);
  for(var i=0;i<lengthOfDistance;i++) {dist[i]=-1;path[i]=i;visit[i]=0}
  var lengthOfstartDistance=distance[start].length;
  pqueue=new Queue();
  var ben={
    aid:start,
    weight:0
  };
  pqueue.push(ben);
  for(var i=0;i<lengthOfDistance;){
    var min=pqueue.pop();
    if(!min) break;
    if(visit[min.aid]==1) continue;
    visit[min.aid]=1;
    i++;
    var lengthOfMin=distance[min.aid].length;
    for(var j=0;j<lengthOfMin;j++){
      if(visit[distance[min.aid][j].aid]==1) continue;
      if(dist[distance[min.aid][j].aid]==-1||dist[min.aid]+distance[min.aid][j].weight<dist[distance[min.aid][j].aid]){
        dist[distance[min.aid][j].aid]=dist[min.aid]+distance[min.aid][j].weight
        path[distance[min.aid][j].aid]=min.aid;
        var temp={
          aid:distance[min.aid][j].aid,
          weight:dist[distance[min.aid][j].aid]
        };
        pqueue.push(temp);
      }
    }
  }
  var output={};
  output.distance=dist[end];
  var temp=end,outputPath=[temp];
  var ou=""
  for(var i=0;i<lengthOfDistance;i++) ou+=path[i]+" ";
  console.log(ou);
  while(path[temp]!=temp){
    outputPath.push(path[temp]);
    temp=path[temp];
  }
  output.path=outputPath;
  callback(null,output);
}
