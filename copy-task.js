var shell = require('shelljs');

shell.cp('-R', 'config/*.*', 'dist/');
shell.cp('-R', 'config/.env', 'dist/');
shell.cp('-R', 'package.json', 'dist/');