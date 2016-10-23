var BbPromise = require('bluebird');
var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({
    profile: 'default'
});
AWS.config.credentials = credentials;

var Utils = function() {};

Utils.getTableSchema = function(_table_name, _region) {
    return new BbPromise(function(resolve) {
        AWS.config.update({
            region: _region
        });

        var dynamodb = new AWS.DynamoDB();

        var params = {
            TableName: _table_name
        };

        dynamodb.describeTable(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else {
                var _table = data.Table;
                delete _table.TableStatus;
                delete _table.CreationDateTime;
                delete _table.TableSizeBytes;
                delete _table.ItemCount;
                delete _table.ProvisionedThroughput.NumberOfDecreasesToday;
                delete _table.TableArn;

                if (_table.GlobalSecondaryIndexes != undefined) {
                    for (var i = 0; i < _table.GlobalSecondaryIndexes.length; i++) {

                        delete _table.GlobalSecondaryIndexes[i].IndexStatus;
                        delete _table.GlobalSecondaryIndexes[i].ProvisionedThroughput.NumberOfDecreasesToday;
                        delete _table.GlobalSecondaryIndexes[i].IndexSizeBytes;
                        delete _table.GlobalSecondaryIndexes[i].ItemCount;
                        delete _table.GlobalSecondaryIndexes[i].IndexArn;
                    }
                }

                if (_table.LocalSecondaryIndexes != undefined) {
                    for (var j = 0; j < _table.LocalSecondaryIndexes.length; j++) {

                        delete _table.LocalSecondaryIndexes[j].IndexStatus;
                        delete _table.LocalSecondaryIndexes[j].ProvisionedThroughput.NumberOfDecreasesToday;
                        delete _table.LocalSecondaryIndexes[j].IndexSizeBytes;
                        delete _table.LocalSecondaryIndexes[j].ItemCount;
                        delete _table.LocalSecondaryIndexes[j].IndexArn;
                    }
                }

                resolve(_table);
            }
        });
    });
};

Utils.createTable = function(_params, _region) {
    return new BbPromise(function(resolve) {
        AWS.config.update({
            region: _region
        });

        var dynamodb = new AWS.DynamoDB();

        dynamodb.createTable(_params, function(err, data) {
            if (err) console.log(err, err.stack);
            else resolve(data);
        });
    });
};

Utils.setDefaultProfile = function(_profile) {
    var _credentials = new AWS.SharedIniFileCredentials({
        profile: _profile
    });
    AWS.config.credentials = _credentials;
};

Utils.migrateAll = function(_tables, _from_region, _to_region, _profile) {
    return new BbPromise(function(resolve) {
        var tablesArray = _tables.split(',');
        var tables_promises = [];

        if (!_profile) {
            Utils.setDefaultProfile(_profile);
        }
        for (var i = 0; i < tablesArray.length; i++) {
            tables_promises.push(Utils.getTableSchema(tablesArray[i], _from_region));
        }

        BbPromise.all(tables_promises)
            .then(function(results) {

                console.log("Table schema retreival done");
                var promises_all_tables = [];

                for (var j = 0; j < results.length; j++) {
                    promises_all_tables.push(Utils.createTable(results[j], _to_region));
                }

                BbPromise.all(promises_all_tables)
                    .then(function(results) {
                        console.log("Tables creation done");
                        resolve("success");  //retrun as success
                    })
                    .catch(function(e) {
                        resolve(e);
                    });
            })
            .catch(function(e) {
                console.log(e);
            });
    });
};

module.exports = Utils;
