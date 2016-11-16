/**
 * Created by sunzhimin on 26/07/16.
 * 修改不同网址的请求, 显示不同的内容 相当于一个网站的雏形
 */


var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  // req- request 属性
  // url: 发出请求的网址
  // method: HTTP 请求的方法
  // headers: HTTP 请求的所有 HTTP 头信息



  // 主页
  console.log( 'req.url~~  : ' + req.url );
  console.log( 'req.method~~  : ' + req.method );
  console.log( 'req.headers~~  : ' + req.headers );
  if ( req.url == '/' ) {
    res.writeHead( 200, {
      'Content-Type': 'text/html'
    } );

    res.end( 'Welcome to the homepage!' )
  }

  // about
  else if ( req.url == '/about' ) {
    res.writeHead( 200, {
      'Content-Type': 'text/html'
    } );

    res.end( 'Welcome to the about page!' )
  }

  // 404 错误
  else {
    res.writeHead( 404, {
      'Content-Type': 'text/plain'
    } );

    res.end( '404 error! File not found.' )
  }

}).listen(8080);
// listen 表示启动服务器实例!

console.log("HTTP server is listening at port 8080~~~~~~~~~~~");

