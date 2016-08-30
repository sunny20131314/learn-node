/**
 * Created by sunzhimin on 26/07/16.
 */


var http = require('http');
var fs = require('fs');
var zlib = require('zlib');

// server用于新建一个服务器实例
var server = new http.Server();
server.listen( 8080 );

server.on( 'request', function ( response, request ) {
  // 解析请求的 URL
  var url = require( 'url').parse( response.url );
  if ( url.pathname === '/1' ) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
    response.write('Hello');
    response.end();
  }
  else if ( url.pathname === '/2' ) {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});

    // 打印格式同 request 头部信息
    response.write( response.method + ' ' + response.url + ' HTTP/' + response.httpVersion + '\n');

    for ( var h in request.headers ) {
      response.write( h + ': ' + request.headers[h] + '\n' );
    }

    response.write('\r\n');

    // -- 当客户端向服务器端发送数据时, 触发服务器端request的事件.
    // 此时服务器端也同时向客户端传送数据!
    request.on('data', function(chunk) {
      response.write(chunk);
    });
    request.on('end', function(chunk) {
      response.end();
    });
  }
  else {
    var filename = url.pathname.substring(1);
    var type;
    switch ( filename.substring( filename.lastIndexOf('.') + 1)) {
      case 'html':
      case 'htm':      type = 'text/html; charset=UTF-8'; break;
      case 'js':       type = 'application/javascript; charset=UTF-8'; break;
      case 'css':      type = 'text/css; charset=UTF-8'; break;
      case 'txt' :     type = 'text/plain; charset=UTF-8'; break;
      case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
      default:         type = 'application/octet-stream'; break;
    }
    fs.readFile(filename, function (err, content) {
      if (err) {
        response.writeHead(404, {
          'Content-Type': 'text/plain; charset=UTF-8'});
        response.write(err.message);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type': type});
        response.write(content);
        response.end();
      }
    });

  }
});

console.log("HTTP server is listening at port 8080~~~~~~~~~~~");

