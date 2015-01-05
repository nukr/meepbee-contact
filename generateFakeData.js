var uuid = require('node-uuid');
var fs = require('fs');
var config = require('./config.js');

var ws = fs.createWriteStream('./fakeuser.json', {flags: 'a+', encoding: 'utf8', mode: 0666});
var arrLength = 2000;
var step = config.numberOfUser / arrLength;

var uuids = function () {
    var arr = [];
    for (var i=0; i < arrLength; ++i) {
        var id = uuid.v4();
        // 取 uuid 的一半 push 到陣列裡面
        arr.push(id.slice(0, id.length / 2));
    }
    return arr;
}

for (var r=0; r < step; ++r) {
    var uuidArr = uuids();

    for (var i=0; i < arrLength; ++i) {
        var obj = {};
        obj.phone = uuidArr[i];
        obj.contacts = [];
        for (var j=0; j < config.contactLength; ++j) {
            obj.contacts[j] = {
                phone: uuidArr[Math.floor( ( Math.random() * arrLength ) )]
            }
        }
        var objJSON = JSON.stringify(obj);
        ws.write(objJSON + "\n");
    }
}
