var Utils= function () {};

Utils.getTableSchema = function (table_name,region){
	const spawn = require('child_process').spawn;
	const ls = spawn('aws', ['dynamodb', 'describe-table', '--table-name' ,table_name, '--region',region]);

	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);

	  var tableData = `${data}`;
	  console.log(JSON.parse(tableData))
	});

	ls.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
}

module.exports= Utils;
