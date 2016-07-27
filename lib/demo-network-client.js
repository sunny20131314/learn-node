/**
 * Created by sunzhimin on 26/07/16.
 */
var http = require('http');

// 模拟客户端
var options = {
  hostname: 'localhost',
  port: 3000,
  path: '',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var request = http.request(options, function (response) {
  response.on('data', function(data) {
    console.log(data.toString('utf-8'), '服务器端相应啦~~~~');
  });
  response.on('end', function(data) {
    console.log(data, '服务器端相应end~~~~~~');
  });
});

request.write('客户端发请求, Hello World~~~');
request.end('客户端发请求, end~~~~~');