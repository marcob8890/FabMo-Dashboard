//var zip = require('unzip');
//var fs = require('fs');

process.on('exit', function(code) {
	fs.rmdirSync('~/Desktop/tmp/file_execute');
}

fs.createReadStream('~/Desktop/file_executer.fma').pipe(zip.Extract({ path: '~/Desktop/tmp/file_execute' }));



