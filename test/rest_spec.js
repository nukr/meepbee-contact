var frisby = require('frisby');

frisby.create('Insert Empty Data')
    .post('http://localhost:3000/users')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "code": 500,
    })
    .toss();

frisby.create('Insert Good Data')
    .post('http://localhost:3000/users', {
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
    .post('http://localhost:3000/users', {
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
    .get('http://localhost:3000/friends/3345678')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(["0961007003", "0961007007"])
    .toss();

frisby.create('Get /followme/:phone')
    .get('http://localhost:3000/followme/0961007003')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(["3345678"])
    .toss();
