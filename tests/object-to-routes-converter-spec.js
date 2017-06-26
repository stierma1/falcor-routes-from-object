var chai = require("chai");
var expect = chai.expect;
var convert = require("../lib/object-to-routes-converter")

describe("ObjectToRoutesConverter", () => {
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

  var dataRoute2 = "my.movies[{keys:name}]"
  var dataObject2 = {
    name:"steve",
    time: 0,
    moviePoster: "http://some.image.com",
    movieUrl:"http://some.url.com"
  }

  it("should build routes", () => {
    var objectInfos = [{dataRoute, dataObject, dataService, expires:-5},{dataRoute:dataRoute2, dataObject:dataObject2, dataService, expires:-5}]
    var routes = convert(objectInfos);
    expect(routes.length).equals(8);
    expect(routes[0].route).equals('my.toys[{keys:name}].name');
    expect(routes[1].route).equals('my.toys[{keys:name}].height');
    expect(routes[2].route).equals('my.toys[{keys:name}].weight');
    expect(routes[3].route).equals('my.toys[{keys:name}].specifications[{integers:idx1}].description');
    expect(routes[4].route).equals('my.movies[{keys:name}].name');
    expect(routes[5].route).equals('my.movies[{keys:name}].time');
    expect(routes[6].route).equals('my.movies[{keys:name}].moviePoster');
    expect(routes[7].route).equals('my.movies[{keys:name}].movieUrl');
  })
})
