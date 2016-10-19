var exe = require('exe');

var Dynamodb= function () {
  console.log("This is a Constructor");
};

Dynamodb.execution = function (command){
  exe(command);
}

module.exports= Dynamodb;
