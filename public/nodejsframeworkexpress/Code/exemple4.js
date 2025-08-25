// Travailler avec les module built-in : path, os et les fichiers avec fs

const path = require('path')    // built-in module
const os = require('os')        // built-in module
const fs = require('fs')        // built-in module

var pathObj = path.parse(__filename);
console.log(pathObj);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total memory ${totalMemory}`);
console.log(`Free memory ${freeMemory}`);

fs.readdir('./', function(err, files){
    if(err) console.log('Erreur : ', err);
    else console.log('Result : ', files);
})