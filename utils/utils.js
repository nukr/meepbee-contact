"use strict";
var fs = require('fs');

exports.userdatatodb = function (client, user, callback) {

    var numInserted = 0;
    var status = {}

    // 沒 phone 就不用繼續了
    if (user.phone === undefined) {
        status.code = 500;
        callback(status)
    } else {
        if (user.contacts !== undefined) {
            status.contacts = user.contacts.length;
            user.contacts.forEach(function (contact, index) {
                if (user.phone && contact.phone) {
                    numInserted += 1;
                    client.sadd("MB:" + user.phone + ":registered", contact.phone);
                    client.sadd("MB:" + contact.phone + ":BT", user.phone);
                } else {
                    if (!status.errContact) {
                        status.errContact = [];
                    }
                    status.errContact.push(index + ':' + contact)
                }
            });
        }
        status.code = 200;
        status.inserted = numInserted;
        callback(status)
    }

};

exports.normalize = function (phone) {
    return phone;
};
