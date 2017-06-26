# falcor-routes-from-object

## Info
Builds data routes given a dataRouteString, a sample dataObject, a dataService and optional expires

## Usage
```js
var convert = require("falcor-routes-from-object");
var dataRoute = "my.toys[{keys:name}]"
var dataObject = {
  name:"steve",
  height:1,
  weight:2,
  specifications:[
    {
      description:"soft"
    }
  ]
}

var dataService = {
  getData:function({rawDataString, route, params, resolve, reject}){
    resolve(params);
  }
}

var objectInfos = [{dataRoute, dataObject, dataService, expires:-5}];
var routes = convert(objectInfos);

//routes are useable by falcor server, user may want to extract the .route properties and generate a /api endpoint using the data
```
