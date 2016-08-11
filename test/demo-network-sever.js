/**
 * Created by sunzhimin on 26/07/16.
 */


// 'http'模块提供两种使用方式：
// 作为服务端使用时，创建一个 HTTP 服务器，监听 HTTP 客户端请求并返回响应。
// 作为客户端使用时，发起一个 HTTP 客户端请求，获取服务端响应。

var http = require('http');
var zlib = require('zlib');

var i = 1;
// 首先需要使用.createServer方法创建一个服务器，然后调用.listen方法监听端口。
// 之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。

//HTTP 请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。
http.createServer(function (request, response) {
  // 客户端触发 response 事件,
  // 向客户端发送数据!!! write -> data事件!
  //response.writeHead(200, {'Content-Type': 'text/html'});

  // 服务器端触发 request 事件,
  console.log(request.method);
  console.log(request.headers);

  var body = [];

  request.on('data', function (chunk) {
    console.log('有请求啦~~~' , chunk.toString('utf-8'));
    body.push(chunk);

    // 服务端原样将客户端请求的请求体数据返回给客户端。
    response.write('<h1>111</h1> <p>Hello World ' + ( ++i ) + '</p>' + chunk.toString('utf-8'));
  });


  request.on('end', function () {
    body = Buffer.concat(body);
    console.log(body.toString(), 'body, msg~~~~~~~~~~~~~~');

    response.end('ffhhjh');
  });


  var i = 100,
    data = '';

  while (i--) {
    data += '.';
  }

  // zlib 压缩
  // zlib 模块压缩 HTTP 响应体数据
  // 判断客户端是否支持 gzip，并在支持的情况下使用 zlib 模块返回 gzip 之后的响应体数据。

  // 从规范上讲，HTTP 请求头和响应头字段都应该是驼峰的。
  // 但现实是残酷的，不是每个 HTTP 服务端或客户端程序都严格遵循规范，
  // 所以 NodeJS 在处理从别的客户端或服务端收到的头字段时，都统一地转换为了小写字母格式，以
  // 便开发者能使用统一的方式来访问头字段，例如 headers['content-length']。
  if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
    console.log(data.toString(), 'data .....................');
    zlib.gzip(data, function (err, data) {
      response.writeHead(200, {
        'Content-Length': '5000',
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
      });
      response.end(data);
    });
  } else {
    response.writeHead(200, {
      'Content-Length': '5000',
      'Content-Type': 'text/plain'
    });
    response.end(data);
  }
}).listen(3000);

console.log("HTTP server is listening at port 3000~~~~~~~~~~~");

