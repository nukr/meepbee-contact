var utils = require('./utils');
var lazy = require('lazy.js');
var config = require('../config.js');
var client = require('./connectRedis');

client.flushall();

var start, end;
lazy.readFile(__dirname + '/fakeuser.json')
    .lines()
    .take(config.numberOfUser)
    .each(function (user, index) {
        if (index === 0) {
            start = new Date().getTime()
        }
        utils.userdatatodb( client, JSON.parse(user) )
        if(index === config.numberOfUser - 1) {
            end = new Date().getTime()
            console.log("total execute time:", end - start + 'ms');
            client.quit()
        }
    })
