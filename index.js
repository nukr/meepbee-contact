var express = require('express');
var bodyParser = require('body-parser');
var client = require('./connectRedis');

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

app.get('/friends/:phone/registered', function (req, res) {
    res.send('hi');
});

app.post('/users', function (req, res) {
    // store user with contact
    //utils.userdatatodb(client, user3);
});

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port);
})

