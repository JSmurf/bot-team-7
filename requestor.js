'use strict';
var https = require('https');
var queryString = require('querystring');
var url = require('url');

module.exports = function(queryUrl, postObj, cb) {
    queryUrl = url.parse(queryUrl);
    let postStr = queryString.stringify(postObj);
    let options = {
      protocol: 'https:',
      hostname: queryUrl.hostname,
      path: queryUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postStr),
        "X-Mashape-Key": "AVDT3ukkbImsh3vNnYlW9PrcwKBEp11d2b8jsnxecsOVjTtXyd"
      }
    };
    var response = [];
    var req = https.request(options, (res) => {
      res.on('data', (chunk) => {
        response.push(chunk.toString());
      });
      res.on('end', () => {
        cb(null, JSON.parse(response.join('')));
      });
    });

    req.write(postStr);
    req.end();
  };