var client = require('./utils/connectRedis');
var utils = require('./utils/utils');

exports.listAll = function (req, res) {
    client.smembers("MB:" + req.params.phone + ":registered", function (err, friends) {
        res.send(friends);
    });
};

exports.followMe = function (req, res) {
    client.smembers("MB:" + req.params.phone + ":BT", function (err, followme) {
        res.send(followme);
    });
};

exports.addUser = function (req, res) {
    // store user with contact
    utils.userdatatodb(client, req.body, function (code) {
        res.json(code);
    });
};
