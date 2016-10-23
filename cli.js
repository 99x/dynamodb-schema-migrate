var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Preferences = require('preferences');
var Spinner = CLI.Spinner;
var _ = require('lodash');
var touch = require('touch');
var fs = require('fs');

var DSMigrate = require('./index');
var utils = require('./lib/utils');

console.log(
    chalk.yellow(
        figlet.textSync('SchemaMigrate', {
            horizontalLayout: 'full'
        })
    )
);

getParams(function() {
    var status = new Spinner('Please wait......');
    status.start();
    var args = arguments[0];
    var arr = new array(arrayargs.tables);

    console.log(arr ,args.from,args.to,args.profile);
    DSMigrate.migrateSchema(args.tables,args.from,args.to,args.profile).then(function(data){
        console.log("\nHere Comes the Table \n")
        console.log(data)     
        status.stop();

    },function(err){
        console.log(err)
        status.stop();

    })

});

function getParams(callback) {
    var questions = [{
        name: 'from',
        type: 'input',
        message: 'Region FROM the current table: ',
        validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a from region';
            }
        }
    }, {
        name: 'to',
        type: 'input',
        message: 'Region TO migrate the Schema: ',
        validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a to region';
            }
        }
    }, {
        name: 'tables',
        type: 'input',
        message: 'Enter Table names(comma seperated- Customer,Product): ',
        validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter at least one table name';
            }
        }
    }, {
        name: 'profile',
        type: 'input',
        message: 'Enter AWS-CLI Profile name: (default) ',

    }];


    inquirer.prompt(questions).then(callback);
}