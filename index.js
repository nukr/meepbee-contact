var async = require('async');
var express = require('express');
var redis = require('redis');
var client = require('./connectRedis');
var utils = require('./utils');
var bodyParser = require('body-parser');
//var users = require('./users.json');

//client.flushall();

//users.forEach(function (user) {
    //utils.userdatatodb(client, user);
//});

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/friends/:phone', function (req, res) {
    client.smembers("MB:" + req.params.phone + ":registered", function (err, friends) {
        res.send(friends);
    });
});

app.get('/friends/followme/:phone', function (req, res) {
    client.smembers("MB:" + req.params.phone + ":BT", function (err, followme) {
        res.send(followme);
    });
});

app.post('/users', function (req, res) {
    // store user with contact
    console.log(req.body);
    //utils.userdatatodb(client, req.body.user);
});

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port);
})

