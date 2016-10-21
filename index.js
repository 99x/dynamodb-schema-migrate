var utils = require('./lib/utils');


// utils.getTableSchema('interns','us-east-1').then(function(data){
// 	console.log("\nHere Comes the Table \n");
//     console.log(data);
//
// },function(err){
//     console.log(err);
// });

var array = ["interns","task"];
var region = "us-east-1";

var createTableArray = function(array,region) {
    var tableArray = [];
    var promises = [];

    for (var i = 0; i < array.length ; i++) {
        promises.push(utils.getTableSchema(array[i],region));
    }

    Promise.all(promises)
      .then(function(results) {
        console.log("All done", results);
      })
      .catch(function(e) {
          console.log(e);
      });

};

createTableArray(array,region);
