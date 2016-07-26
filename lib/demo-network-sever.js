/**
 * Created by sunzhimin on 26/07/16.
 */


// 'http'模块提供两种使用方式：
// 作为服务端使用时，创建一个 HTTP 服务器，监听 HTTP 客户端请求并返回响应。
// 作为客户端使用时，发起一个 HTTP 客户端请求，获取服务端响应。

var http = require('http');

var i = 1;
// 首先需要使用.createServer方法创建一个服务器，然后调用.listen方法监听端口。
// 之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。

//HTTP 请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  var body = [];

  // 服务器端触发 request 事件,
  console.log(request.method);
  console.log(request.headers);

  request.on('data', function (chunk) {
    body.push(chunk);

    // 服务端原样将客户端请求的请求体数据返回给客户端。
    response.write('<h1>Node.js</h1> <p>Hello World ' + ( ++i ) + '</p>' + chunk);
  });

  request.on('end', function () {
    body = Buffer.concat(body);
    console.log(body.toString(), 'body~~~~');

    response.end(console.log(i));
  });

  // 客户端触发 response 事件,
  // 向客户端发送数据!!! write -> data事件!

}).listen(3000);

console.log("HTTP server is listening at port 3000.");

