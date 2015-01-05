var redis = require('redis');
// 建立 redis 連線
var client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err)
});

module.exports = client;
