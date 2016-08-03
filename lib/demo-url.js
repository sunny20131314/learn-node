/**
 * Created by sunzhimin on 03/08/16.
 */
// url 操作
// querystring
// zlib

// url 操作
var url = require('url');

// 将一个 URL 字符串转换为 URL 对象
// .parse方法还支持第二个和第三个布尔类型可选参数。
// 第二个参数等于 true 时，该方法返回的 URL 对象中，query 字段不再是一个字符串，而是一个经过 querystring 模块转换后的参数对象。
//      ex: query: { query: 'string' },
// 第三个参数等于 true 时，该方法可以正确解析不带协议头的 URL，例如//www.example.com/foo/bar。
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');

// 将一个URL 对象 转换为 URL 字符串
url.format({
  protocol: 'http:',
  host: 'www.example.com',
  pathname: '/p/a/t/h',
  search: 'query=string'
});
//=> 'http://www.example.com/p/a/t/h?query=string'

// 拼接一个url 字符串
url.resolve('http://www.example.com/foo/bar', '../baz'); //-> http://www.example.com/baz

// querystring 模块用于实现 URL 参数字符串与参数对象的互相转换
querystring.parse('foo=bar&baz=qux&baz=quux&cor');  // -> { foo: 'bar', baz: ['qux', 'quux'], cor: '' }
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], cor: '' });  // -> 'foo=bar&baz=que&baz=quux&cor='

// zlib 模块提供了数据压缩和解压的功能。当我们处理 HTTP 请求和响应时，可能需要用到这个模块。
// 详见 demo-network-serve/client
http.createServer(function (request, response) {
  var i = 1024,
    data = '';

  while (i--) {
    data += '.';
  }

  if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
    zlib.gzip(data, function (err, data) {
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
      });
      response.end(data);
    });
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.end(data);
  }
}).listen(80);






