/**
 * Created by sunzhimin on 26/07/16.
 */

// 模拟客户端
var options = {
  hostname: 'http://localhost',
  port: 3000,
  path: '',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var request = http.request(options, function (response) {});

request.write('Hello World~~~');
request.end();