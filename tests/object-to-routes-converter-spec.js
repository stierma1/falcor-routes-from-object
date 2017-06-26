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
      },
      {
        description:"hard"
      }
    ]
  }

  var dataService = {
    getData:function({rawDataString, route, params, resolve, reject}){
      resolve(dataObject);
    }
  }

  var dataRoute2 = "my.movies[{keys:name}]"
  var dataObject2 = {
    name:"steve",
    time: 0,
    moviePoster: "http://some.image.com",
    movieUrl:"http://some.url.com"
  }

  it("should build routes", async () => {
    var objectInfos = [{dataRoute, dataObject, dataService, expires:-5},{dataRoute:dataRoute2, dataObject:dataObject2, dataService, expires:-5}]
    var routes = convert(objectInfos);
    expect(routes.length).equals(9);
    expect(routes[0].route).equals('my.toys[{keys:name}].name');
    expect(routes[1].route).equals('my.toys[{keys:name}].height');
    expect(routes[2].route).equals('my.toys[{keys:name}].weight');
    expect(routes[3].route).equals('my.toys[{keys:name}].specifications.length');
    expect(routes[4].route).equals('my.toys[{keys:name}].specifications[{integers:idx1}].description');
    expect(routes[5].route).equals('my.movies[{keys:name}].name');
    expect(routes[6].route).equals('my.movies[{keys:name}].time');
    expect(routes[7].route).equals('my.movies[{keys:name}].moviePoster');
    expect(routes[8].route).equals('my.movies[{keys:name}].movieUrl');
    //Test length route
    var results = await routes[3].get({"name": ["bob"]});
    expect(results.length).equals(1);
    expect(results[0].value.value).equals(2);
  })
})
