var uuid = require('node-uuid');
var fs = require('fs');
var config = require('./config.js');

var ws = fs.createWriteStream('./fakeuser.json', {flags: 'w', encoding: 'utf8', mode: 0666});

var uuids = function () {

    var arr = []
    for (var i=0; i < config.arrLength; ++i) {
        arr.push(uuid.v4());
    }

    return arr;
}

var uuidArr = uuids();

for (var i=0; i < config.arrLength; ++i) {
    var obj = {};
    obj.phone = uuidArr[i];
    obj.contacts = [];

    for (var j=0; j < config.contactLength; ++j) {
        obj.contacts[j] = {
            phone: uuidArr[Math.floor( ( Math.random() * config.arrLength ) )]
        }
    }

    var objJSON = JSON.stringify(obj);

    ws.write(objJSON + "\n");
}

ws.end();
