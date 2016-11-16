/**
 * Created by sunzhimin on 26/07/16.
 * 当客户端采用 POST 方法发送数据时, 服务器端可以设立req的 data, end事件监听
 */


var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  var  content = '';

  //假如我们需要获取 GET/POST 方式传递过来的参数, 是无法直接得到的, 需要对 request 对象进行处理, 才可以得到我们想要的参数.
  // 在 GET 方式中:
  // 参数都是以键值方式拼接在请求的 URL 当中的, 所以我们可以通过解析 URL 来获得参数.
  // 我们可以通过 Node.js 内建的 url 库来解析 GET 请求过来的 URL.
  var url = require('url');
  // 然后调用 url.parse 函数.
  console.log('url.parse(req.url)   :  ' + url.parse(req.url));
  console.log('url.parse(req.url, true)   :  ' + url.parse(req.url, true));
  var params1 = url.parse(req.url, true).query;  // params 即为我们需要的参数 不能打印出来
  //console.log('params   :  ' + params1);



  // data 在接收数据的过程中, 接收一段数据就会被触发一次, 接收到的数据传入回调函数.
  req.on( 'data', function ( chunk ) {
    console.log( '服务器端接收到数据: !!!! ' );
    console.log( chunk  );
    content += chunk;
  });

  // end 在所有数据接收完成后触发
  req.on( 'end', function () {
    res.writeHead( 200, {
      'Content-Type': 'text/plain'
    });

    res.write( ' you\'ve sent: ' + content );
    res.end();
  });

}).listen(8080);
// listen 表示启动服务器实例!

console.log("HTTP server is listening at port 8080~~~~~~~~~~~");

