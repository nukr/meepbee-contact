var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var contacts = require('./contacts');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('client/build'))
app.use(morgan('dev'));

app.get('/friends/:phone', contacts.listAll);

app.get('/followme/:phone', contacts.followMe);

app.post('/users', contacts.addUser);

var server = app.listen(config.port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port);
});

