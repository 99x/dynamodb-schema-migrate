var utils = require('./lib/utils');

// Example


utils.getTableSchema('Customer','eu-west-1').then(function(data){
	console.log("\nHere Comes the Table \n")
    console.log(data)

},function(err){
    console.log(err)
})

