//迪杰斯特拉优化算法
/*************************************/
//优先队列，说明在报告中算法实现一节中
function Queue(){
  var items=[];//成员数组，表示为堆
  var heapUp=function heapUp(pos){//往数组后面向上比较，复杂度为O(log(size)
    while(pos!=0){
      if(items[pos].weight>=items[parseInt((pos-1)/2)].weight||items[pos].weight==-1) break;
      var temp=items[pos];
      items[pos]=items[parseInt((pos-1)/2)];
      items[parseInt((pos-1)/2)]=temp;
      pos=parseInt((pos-1)/2);
    }
  }
  var heapDown=function heapDown(pos){ //从数组头向下比较，复杂度为O(log(size))
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
  this.push=function push(element){//队列加元素，检查是否有相同的点，若有，删去。
    for(var i=0;i<items.length,i++) {
      if(items[i].aid==element.aid){
        items.remove(i);
        break;
      }
    }
    items.push(element);
    heapUp(items.length-1);
  }

  this.pop=function pop(element){//队列弹出元素，并返回该元素。
    console.log(items);
    var temp=items[0];
    var pos=items.length-1;
    items[0]=items[pos];
    items[pos]=temp;
    items.pop();
    heapDown(0);
    return temp;
  }
  this.front=function(){ //返回队头
    return items[0];
  }
  this.isEmpty=function(){//查看是否为空
    return items.length==0;
  }
  this.clear=function(){//清空队列
    items=[];
  }
  this.size=function(){//返回队列大小
    return items.length;
  }
  this.toString=function(){ //以字符串形式返回队列内容
    return items.toString();
  }
}
/***********************************************/
//迪杰斯特拉优化算法
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
  pqueue.push(ben);//初始化辅助数组，路径数组，优先队列等，将要开始的点放进优先队列中
  for(var i=0;i<lengthOfDistance;){
    var min=pqueue.pop();//获取队列中的最小距离的点
    if(!min) break;
    if(visit[min.aid]==1) continue;
    visit[min.aid]=1;
    i++;
    var lengthOfMin=distance[min.aid].length;
    for(var j=0;j<lengthOfMin;j++){//开始更新辅助数组和优先队列
      if(visit[distance[min.aid][j].aid]==1) continue;
      if(dist[distance[min.aid][j].aid]==-1||dist[min.aid]+distance[min.aid][j].weight<dist[distance[min.aid][j].aid]){
        dist[distance[min.aid][j].aid]=dist[min.aid]+distance[min.aid][j].weight//辅助数组更新
        path[distance[min.aid][j].aid]=min.aid;//路径数组更新
        var temp={
          aid:distance[min.aid][j].aid,
          weight:dist[distance[min.aid][j].aid]
        };
        pqueue.push(temp);//优先队列更新
      }
    }
  }
  var output={};//初始化返回的JSON数据
  output.distance=dist[end];
  var temp=end,outputPath=[temp];//获取start到end的最短距离，并赋给output的distance属性
  var ou=""
  for(var i=0;i<lengthOfDistance;i++) ou+=path[i]+" ";
  console.log(ou);
  while(path[temp]!=temp){//形成路径
    outputPath.push(path[temp]);
    temp=path[temp];
  }
  output.path=outputPath;//路径赋给output的path属性
  callback(null,output);//返回output
}
