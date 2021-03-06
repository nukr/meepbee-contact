"use strict";

var fs = require('fs');
var log = fs.readFileSync(__dirname + '/executeTime.log');
var config = require('../config.js');
var arr = log.toString().split('ms');

var block = ~~(arr.length / config.analyze.blockSize);
console.log('block = ', block);

var arrBlock = [];

for (var i=0; i < block; ++i) {

    arrBlock[i] = {};
    arrBlock[i].total = 0;
    arrBlock[i].min = 9999;
    arrBlock[i].max = 0;
    arrBlock[i].avg = 0;
    arrBlock[i].start = i * config.analyze.blockSize;
    arrBlock[i].end = arrBlock[i].start + config.analyze.blockSize - 1;

    for (var j=0; j < config.analyze.blockSize; ++j) {
        // 算出絕對 index
        var index = j + (i * config.analyze.blockSize);

        arrBlock[i].total += ~~(arr[index]);

        if (arr[index] > arrBlock[i].max) arrBlock[i].max = arr[index];
        if (arr[index] < arrBlock[i].min) arrBlock[i].min = arr[index];
    }
    arrBlock[i].avg = arrBlock[i].total / config.analyze.blockSize;
    console.log(arrBlock);

}
