var frisby = require('frisby');
var config = require('../config');
var api = {
    users: "http://" + config.host + ":" + config.port + "/users",
    friends: "http://" + config.host + ":" + config.port + "/friends",
    followme: "http://" + config.host + ":" + config.port + "/followme"
}

frisby.create('Insert Empty Data')
    .post(api.users)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "code": 500,
    })
    .toss();

frisby.create('Insert Good Data')
    .post(api.users, {
        phone: "3345678",
        contacts:[
            {phone: "0961007003"},
            {phone: "0961007007"}
        ]
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "code": 200
    })
    .toss();

frisby.create('Insert Bad Data #1 - Bad Key')
    .post(api.users, {
        pho: "0961007003",
        contacts:[
            {phone: "0961007004"},
            {phone: "0961007005"}
        ]
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "code": 500
    })
    .toss();

frisby.create('Get /friends/:phone')
    .get(api.friends + '/3345678')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(["0961007003", "0961007007"])
    .toss();

frisby.create('Get /followme/:phone')
    .get(api.followme + '/0961007003')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(["3345678"])
    .toss();
