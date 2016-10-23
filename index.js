var utils = require('./lib/utils');

var DSMigrate = function() {};

DSMigrate.migrateSchema = function(tables, from_region, to_region, profile) {
    utils.migrateAll(tables, from_region, to_region, profile).then(function(data){
      return(data); // "success" return
    });
};

module.exports = DSMigrate;
