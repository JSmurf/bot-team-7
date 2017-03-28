'use strict';
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');

var requestor = require('./requestor.js');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('test success');
    console.log('Express server working');
});


app.post('/', function (req, res) {
    requestor('https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies', req.body, function (err, quote) {
        if (err) console.log('we have a problem');
        console.log(quote);
        let data = {
            response_type: 'in_channel',
            text: quote.quote + ' - ' + quote.author,
        }
        res.json(data);
    });
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("server listening on " + port);
});