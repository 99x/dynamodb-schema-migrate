var utils = require('./lib/utils');

var array = ["interns", "task"]; // your table names here
var from_region = "us-east-1";
var to_region = "ap-northeast-1"


var createTableArray = function(array, from_region, to_region) {
    var tableArray = [];
    var promises = [];

    for (var i = 0; i < array.length; i++) {
        promises.push(utils.getTableSchema(array[i], from_region));
    }

    Promise.all(promises)
        .then(function(results) {
            console.log("Table schema retreival done");
            var promises2 = [];

            for (var j = 0; j < results.length; j++) {
                promises2.push(utils.createTable(results[j], to_region));
            }

            Promise.all(promises2)
                .then(function(results) {
                    console.log("Tables creation done");
                    console.log(results);
                })
                .catch(function(e) {
                    console.log(e);
                });
        })
        .catch(function(e) {
            console.log(e);
        });

};

createTableArray(array, from_region, to_region);
