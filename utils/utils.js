"use strict";
var fs = require('fs');

exports.userdatatodb = function (client, user) {
    var start, end
    start = new Date().getTime();
    user.contacts.forEach(function (contact) {
        client.sadd("MB:" + user.phone + ":registered", contact.phone);
        client.sadd("MB:" + contact.phone + ":BT", user.phone);
    });
    end = new Date().getTime();
    var elapsed = end - start + "ms";
    fs.appendFile(__dirname + '/executeTime.log', elapsed);
};

exports.normalize = function (phone) {
    return phone;
};
