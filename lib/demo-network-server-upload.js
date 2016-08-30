/**
 * Created by sunzhimin on 26/07/16.
 * 当客户端采用 POST 方法发送数据时, 服务器端可以设立req的 data, end事件监听
 *
 * 文件上传 --
 *
 */


var http = require('http');
var fs = require('fs');
var destinationFile, fileSize, uploadedBytes;

http.createServer(function (req, res) {
  res.writeHead( 200, {
    'Content-Type': 'text/plain'
  });

  destinationFile = fs.createWriteStream( './testFile.js' );
  req.pipe( destinationFile );

  fileSize = req.headers['content-length'];
  uploadedBytes = 0;

  req.on( 'data', function (d) {
    uploadedBytes += d.length;

    console.log( 'd~~~' + d );
    var p = ( uploadedBytes / fileSize ) * 100;
    res.write( 'uploading ~~~' + parseInt( p, 0 ) + '\n' );
  });

  req.on( 'end', function () {
    res.end( 'File Upload Complete' );
  });

}).listen(3030);
// listen 表示启动服务器实例!

console.log("HTTP server is listening at port 3030~~~~~~~~~~~");

