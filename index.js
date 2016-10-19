
//exports = module.exports
var dynamo = require('./lib/dynamodb');
var test= new dynamo();
dynamo.execution('echo "hello world"');
