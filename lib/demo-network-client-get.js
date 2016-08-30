/**
 * Created by sunzhimin on 25/08/16.
 * get 请求 ?? -- 如何传递参数, 直接写第一个参数中, 因为有port,不支持直接写
 *
 */
var http = require('http');


function getTestPersonaLoginCredentials( callback ) {
  return http.get({
    host: 'localhost',
    port: 8080,
    path: '/email'
  }, function(response) {
    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      console.log( 'get请求接收到的数据: ' + body );
    });
  })
    .on( 'err', function( e ) {
      console.log("Got error: " + e.message);
    });

}

getTestPersonaLoginCredentials( );