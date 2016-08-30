/**
 * Created by sunzhimin on 26/07/16.
 * 简单的一个网站, 可以读取文件,并返回
 */


// 'http'模块提供两种使用方式：
// 作为服务端使用时，创建一个 HTTP 服务器，监听 HTTP 客户端请求并返回响应。
// 作为客户端使用时，发起一个 HTTP 客户端请求，获取服务端响应。

// 核心模块总是优先加载的, 即使是自己写了个HTTP模块, 加载require( 'http' ) 加载的还是核心模块
var http = require('http');
var fs = require('fs');

// 首先需要使用.createServer方法创建一个服务器，然后调用.listen方法监听端口。
// 之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。

//HTTP 请求本质上是一个数据流，由请求头（headers）和请求体（body）组成。例如以下是一个完整的HTTP请求数据内容。
// 构造一个服务器实例!
http.createServer(function (request, response) {
  // request(对象): 表示客户端的 HTTP 请求
  // response(对象): 表示服务器端的 HTTP 回应.

  // response.end 写入HTTP 回应的具体内容, 以及回应完成后关闭本次对话.
  // response.writeHead 写入HTTP 回应的头信息.


  // method1 去读网页文件, 并将其返回
  //fs.readFile( `${__dirname}/module-main.js`, function readData ( err, data ) {
  //  if ( err ) throw err;
  //  response.writeHead( 200, {
  //    'Content-Type': 'text/plain'
  //  } );
  //  response.end( data );
  //});

  // method2 去读网页文件, 并将其返回
  console.log(111);
  // pipe 封装了数据流, data, end事件!
  fs.createReadStream( `${__dirname}/demo-url.js` ).pipe( response );
}).listen(3000);
// listen 表示启动服务器实例!

console.log("HTTP server is listening at port 3000~~~~~~~~~~~");

