var BbPromise = require('bluebird');
var AWS = require('aws-sdk'); 
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

var Utils= function () {};

Utils.getTableSchema = function (_table_name,_region){
	return new BbPromise(function(resolve) {
        AWS.config.update({region: _region});

		var dynamodb =  new AWS.DynamoDB();

		var params = {
		  TableName: _table_name 
		};

		dynamodb.describeTable(params, function(err, data) {
		  if (err) console.log(err, err.stack);
		  else {
		  	var _table = data.Table;
		  	delete _table.TableStatus
			delete _table.CreationDateTime
			delete _table.TableSizeBytes
			delete _table.ItemCount
			delete _table.ItemCount
			delete _table.TableArn
		  	resolve(_table);  
		  }
		});
    });
}

Utils.setDefaultProfile = function (_profile){
	var _credentials = new AWS.SharedIniFileCredentials({profile: _profile});
	AWS.config.credentials = _credentials;
}

module.exports= Utils;
