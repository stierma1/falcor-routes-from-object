
var pathsFromObjectGenerator = require("falcor-router-path-generator");
var FalcorDataRouteBuilder = require("falcor-data-route-builder");

module.exports = function(routeInfoObjs){
  var routes = {};
  for(var {dataRoute, dataObject, dataService, expires} of routeInfoObjs){
    var paths = JSON.parse(pathsFromObjectGenerator(dataRoute, dataObject, true));
    for(var pathObj of paths){
      //routes will dedup
      routes[pathObj.route] = FalcorDataRouteBuilder.getDataRoute({routeString:pathObj.route, dataString:dataRoute, dataService, expires});
    }
  }

  var returnValue = [];
  for(var routeIdx in routes){
    var routeObj = routes[routeIdx];
    returnValue.push(routeObj);
  }

  return returnValue;
}
