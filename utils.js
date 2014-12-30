"use strict";

exports.userdatatodb = function (client, user) {
    user.contacts.forEach(function (contact) {
        client.sadd("MB:" + user.phone + ":registered", contact.phone);
        client.sadd("MB:" + contact.phone + ":BT", user.phone);
    });
};

exports.normalize = function (phone) {
    return phone;
};
