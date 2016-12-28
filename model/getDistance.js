//var dataBase=require("./dataBase");
var Map=require("./Map");
var LMap=require("./LMap");

module.exports=function(req,res,next){
  Map.getDistance(function(err,distance){
    res.distance=distance;
    LMap.getDistance(function(err,cdistance){
      res.cdistance=cdistance;
      next();
    })
  })
}
