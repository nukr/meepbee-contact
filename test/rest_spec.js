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
        phone: 0961007003,
        contacts:[
            {phone: 0961007004},
            {phone: 0961007005}
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
        pho: 0961007003,
        contacts:[
            {phone: 0961007004},
            {phone: 0961007005}
        ]
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "code": 500
    })
    .toss();
