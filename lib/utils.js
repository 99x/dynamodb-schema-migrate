var exe = require('exe');

var Utils= function () {
  console.log("This is a Constructor");
};

Utils.execute = function (command){
  exe(command);
}

module.exports= Utills;
