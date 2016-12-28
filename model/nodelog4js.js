var log4js=require('log4js');
exports.configure=function configure(address){
  log4js.configure(address);
}
exports.logger=function(){
  var logger = log4js.getLogger('logInfo');
  logger.setLevel('DEBUG');
  return logger;
}
exports.use=function use(app){
  app.use(log4js.connectLogger(this.logger('logInfo'),{level:'debug',format:':method :url'}));
}
