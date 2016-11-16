/**
 * Created by sunzhimin on 03/08/16.
 * node 可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作，
 * 这使得 NodeJS 可以把多个程序组合在一起共同完成某项工作
 */


// Process
// 官方文档： http://nodejs.org/api/process.html
// 任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。
// 在 NodeJS 中，可以通过 process 对象感知和控制 NodeJS 自身进程的方方面面。
// 另外需要注意的是，process 不是内置模块，而是一个全局对象(global console)，因此在任何地方都可以直接使用。
// 它是 `EventEmitter` 的一个实例!


// 进程的退出码 进程退出时，会返回一个整数值，表示退出时的状态。 echo $? 未找到文件1

// !! 以下属性指向系统I/O:
// 1.













// 运行终端

// Child Process
// 官方文档： http://nodejs.org/api/child_process.html
// 使用 child_process 模块可以创建和控制子进程。该模块提供的 API 中最核心的是.spawn，其余 API 都是针对特定使用场景对它的进一步封装，算是一种语法糖。

// Cluster
// 官方文档： http://nodejs.org/api/cluster.html
// cluster 模块是对 child_process 模块的进一步封装，专用于解决单进程 NodeJS Web 服务器无法充分利用多核 CPU 的问题。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。

var path = require('path');

// 运行终端 复制目录
var child_process = require('child_process');
var util = require('util');
function copy(source, target, callback) {
  child_process.exec(
    util.format('cp -r %s/* %s', source, target), callback);
}

// node 执行程序路径和主模块文件路径固定占据了 argv[0]和 argv[1]两个位置
// 第一个命令行参数从 argv[2]开始
// ex:
//     node process-2.js one two=three four
// -> [ '/usr/local/bin/node' , // 执行程序路径
//      'process-2.js', //主模块文件路径
//      'one',
//      'two=three',
//      'four' ]

// 全局变量:  __filename __dirname(运行的脚本的所在文件夹及所在目录)
var srcPath = path.join(__dirname, '../lib');
var destPath = path.join(__dirname, '../test');
//copy(srcPath, destPath, function (err) {
//  console.log(err);
//});

// 监听退出
process.on('exit', function(code) {
  console.log( `About to exit with code: ${code}` );


  // 设置一个延迟执行
  setTimeout(function() {
    console.log('主事件循环已停止，所以不会执行');
  }, 0);
  console.log('退出前执行');
});

// 在大多数终端下，一个发送 SIGINT 信号的简单方法是按下 ctrl + c 。
process.on('SIGINT', function() {
  console.log('收到 SIGINT 信号。  退出请使用 Ctrl + D ');
});

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason);
});

process.on('rejectionHandled', (p) => {
  unhandledRejections.delete(p);
});


// Intentioxnally cause an exception, but don't catch it.
nonexistentFunc();
console.log('This will not run.');