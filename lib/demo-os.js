/**
 * Created by sunzhimin on 25/08/16.
 */

// os
// os模块提供与操作系统相关的方法。

// os.tmpdir()  返回操作系统默认的临时文件目录

// socket 通信

// 列出当前系列的所有 ip

var os = require( 'os' );
var interfaces = os.networkInterfaces();

for ( let item in interfaces ) {
  console.log( 'network interface name: ' + item );

  for ( let att in interfaces[item] ) {
    var address = interfaces[item][att];

    console.log('Family: ' + address.family);
    console.log('IP Address: ' + address.address);
    console.log('Is Internal: ' + address.internal);
    console.log('');
  }
  console.log('==================================');
}