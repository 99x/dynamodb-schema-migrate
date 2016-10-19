var exe = require('exe');

var Utills= function () {
  console.log("This is a Constructor");
};

Utills.execute = function (command){
  exe(command);
}

module.exports= Utills;
