var utils = require('./lib/utils');

var DSMigrate = function() {};

DSMigrate.migrateSchema = function(tables, from_region, to_region, profile) {
    var tabletables = [];
    var promises = [];

    //console.log(tables+" "+from_region+" "+to_region+" "+ profile)

    if(!profile){
    	utils.setDefaultProfile(profile);
    }
    for (var i = 0; i < tables.length; i++) {
        promises.push(utils.getTableSchema(tables[i], from_region));
    }

    Promise.all(promises)
        .then(function(results) {

            console.log("Table schema retreival done");
            var promises_all_tables = [];

            for (var j = 0; j < results.length; j++) {
               promises_all_tables.push(utils.createTable(results[j], to_region));
            }

            Promise.all(promises_all_tables)
                .then(function(results) {
                    console.log("Tables creation done");
                    return (results);
                })
                .catch(function(e) {
                    return (e);
                });
        })
        .catch(function(e) {
            console.log(e);
        });

};

module.exports = DSMigrate;

