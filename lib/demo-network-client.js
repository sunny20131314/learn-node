/**
 * Created by sunzhimin on 26/07/16.
 */
var http = require('http');
var zlib = require('zlib');

// 模拟客户端
var options = {
  hostname: 'localhost',
  port: 3000,
  path: '',
  method: 'post',
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

// 因为默认情况下，使用.writeHead方法写入响应头后，允许使用.write方法写入任意长度的响应体数据，
// 并使用.end方法结束一个响应。
// 由于响应体数据长度不确定，因此 NodeJS 自动在响应头里添加了 Transfer-Encoding: chunked 字段，
// 并采用 chunked 传输方式。
// 但是当响应体数据长度确定时，可使用.writeHead 方法在响应头里加上 Content-Length 字段，
// 这样做之后 NodeJS 就不会自动添加 Transfer-Encoding 字段和使用 chunked 传输方式。
var request = http.request(options, function (response) {
  var body = [];
  response.on('data', function(data) {
    console.log(data.toString('utf-8'), '服务器端相应啦~~~~');
    body.push(data);
  });
  response.on('end', function(data) {
    body = Buffer.concat(body);
    console.log(response.headers, '服务器端相应end~~~~~~');

    // zlib
    // 使用 zlib 模块解压 HTTP 响应体数据
    // 判断服务端响应是否使用 gzip 压缩，并在压缩的情况下使用 zlib 模块解压响应体数据。

    // -- 在这里并没有进入解压,相关的数据也没有得到... T-T
    if (response.headers['content-encoding'] === 'gzip') {
      console.log('response!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      zlib.gunzip(body, function (err, data) {
        console.log(data, body.toString(), 'data, body, ');
      });
    } else {
      zlib.gunzip(body, function (err, data) {
        console.log(data, body.toString(), 'data, body!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      });
    }
  });
});

request.write('客户端发请求, Hello World~~~');
request.end('客户端发请求, end~~~~~');


// 发起客户端 HTTP 请求前需要先创建一个客户端。
// http 模块提供了一个全局客户端 http.globalAgent，可以让我们使用.request或.get方法时不用手动创建客户端。
// 但是全局客户端默认只允许 5 个并发 Socket 连接，当某一个时刻 HTTP 客户端请求创建过多，超过这个数字时，
// 就会发生 socket hang up 错误。
// 解决方法也很简单，通过 http.globalAgent.maxSockets 属性把这个数字改大些即可。
// 另外，https 模块遇到这个问题时也一样通过 https.globalAgent.maxSockets 属性来处理。