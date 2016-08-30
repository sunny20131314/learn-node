/**
 * Created by sunzhimin on 25/08/16.
 */

// 发出 HTTP 请求
var http = require( 'http' );

// http.request(options[, callback])
// request方法的options参数，可以是一个对象，也可以是一个字符串。
// 如果是字符串，就表示这是一个URL，Node内部就会自动调用url.parse()，处理这个参数。
// request方法的callback参数是可选的，在response事件发生时触发，而且只触发一次。

// http.request()返回一个http.ClientRequest类的实例。
// 它是一个可写数据流，如果你想通过POST方法发送一个文件，可以将文件写入这个ClientRequest对象。


//host：HTTP请求所发往的域名或者IP地址，默认是 localhost。
//hostname：该属性会被url.parse()解析，优先级高于host。
//port：远程服务器的端口，默认是80。
//localAddress：本地网络接口。
//socketPath：Unix网络套接字，格式为host:port或者socketPath。
//method：指定HTTP请求的方法，格式为字符串，默认为GET。
//path：指定HTTP请求的路径，默认为根路径（/）。可以在这个属性里面，指定查询字符串，比如/index.html?page=12。如果这个属性里面包含非法字符（比如空格），就会抛出一个错误。
//headers：一个对象，包含了HTTP请求的头信息。
//auth：一个代表HTTP基本认证的字符串user:password。
//agent：控制缓存行为，如果HTTP请求使用了agent，则HTTP请求默认为Connection: keep-alive，它的可能值如下：
//undefined（默认）：对当前host和port，使用全局Agent。
//Agent：一个对象，会传入agent属性。
//false：不缓存连接，默认HTTP请求为Connection: close。
//keepAlive：一个布尔值，表示是否保留socket供未来其他请求使用，默认等于false。
//keepAliveMsecs：一个整数，当使用KeepAlive的时候，设置多久发送一个TCP KeepAlive包，使得连接不要被关闭。默认等于1000，只有keepAlive设为true的时候，该设置才有意义。
var querystring = require( 'querystring' );

var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'localhost',
  port: 8080,
  path: '/about',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request( options, function(res) {
  console.log('STATUS: ~~~~ ' + res.statusCode);
  console.log('HEADERS: ~~~~ ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ~~~~ ' + chunk);
  });
});

// 发送过程的任何错误（DNS错误、TCP错误、HTTP解析错误），都会在request对象上触发error事件。
req.on('error', function(e) {
  console.log('problem with request: ~~~~ ' + e.message);
});

// write data to request body
req.write(postData);

// req.end()必须被调用，即使没有在请求体内写入任何数据，也必须调用。因为这表示已经完成HTTP请求。
req.end();






