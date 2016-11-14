/**
 * Created by sunzhimin on 16/10/27.
 */


var https = require('https');
var fs = require('fs');
var zlib = require('zlib');



var options = {
  key: fs.readFileSync('./ssl/default.key'),
  cert: fs.readFileSync('./ssl/default.cer')
};

// server用于新建一个服务器实例
var server = https.createServer(options, function (request, response) {
  // ...
});