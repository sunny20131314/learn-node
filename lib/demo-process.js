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

// 运行终端

// Child Process
// 官方文档： http://nodejs.org/api/child_process.html
// 使用 child_process 模块可以创建和控制子进程。该模块提供的 API 中最核心的是.spawn，其余 API 都是针对特定使用场景对它的进一步封装，算是一种语法糖。

// !! 以下属性指向 系统I/O
//  1. stdout属性指向标准输出(文件描述符1), 其write -> console.log, 可用在标准输出向用户显示内容!
  process.stdout.write( '哈哈, 这个是write方法!!!!!!!!! \n' );

// 将一个文件导向标准输出
var fs = require( 'fs' );
var zlib = require( 'zlib' );
// 由于process.stdout & process.stdin 与其他进程的通信,都是流(stream)形式, 所以必须通过pipe管道命令中介.
// 先将文件数据压缩,再导向标准输出.
fs.createReadStream( './dist/filtername.txt', {encoding: 'utf8'})
  //.pipe(zlib.createGzip())
  //.pipe(process.stdout);


// 2. stdin 标准输入(文件描述符0)

// 读取标准输入，这主要是为了不让当前进程退出
process.stdin.resume();

// 可在命令端输入!!!
function stdin ( ) {
  process.stdin.setEncoding( 'utf8' );
  process.stdin.on( 'readable', function() {
    var chunk = process.stdin.read();
    if ( chunk !== null ) {
      process.stdout.write( 'data:(stdin) ~~~~~~~~~~~~~' + chunk );
    }
  });
// -- 如何end???
  process.stdin.on( 'end!!!!!!!(stdin)', function() {
    process.stdout.write( 'end' );
  });
}
//stdin();

// 3. stderr 指向标准错误(文件描述符2)


// !! argv, execPath, execArgv
// 1. argv
// node 执行程序路径和主模块文件路径固定占据了 argv[0]和 argv[1]两个位置
// 第一个命令行参数从 argv[2]开始
// ex:
//     node process-2.js one two=three four
// -> [ '/usr/local/bin/node' , // 即node 执行程序路径
//      'process-2.js', // 即脚本文件名 主模块文件路径
//      'one',
//      'two=three',
//      'four' ]

// so 真正的参数是从第二位开始的!
// process.argv.slice(2);

// 2. execPath
//  返回指向当前脚本的Node二进制的绝对路径!

// 3. execArgv
// 返回一数组, 返回node 可执行文件与脚本之间的命令行参数
//node --harmony dist/demo-process.js --version
//console.log( 'process.execArgv: ' + process.execArgv );  //  --harmony


// 监听退出
process.on('exit', function(code) {
  console.log( `About to exit with code: ${code}` );


// !! 方法
//process.chdir()：切换工作目录到指定目录。
//process.cwd()：返回运行当前脚本的工作目录的路径。
//process.exit()：退出当前进程。
//process.getgid()：返回当前进程的组ID（数值）。
//process.getuid()：返回当前进程的用户ID（数值）。
//process.nextTick()：指定回调函数在当前执行栈的尾部、下一次Event Loop之前执行。
//process.on()：监听事件。
//process.setgid()：指定当前进程的组，可以使用数字ID，也可以使用字符串ID。
//process.setuid()：指定当前进程的用户，可以使用数字ID，也可以使用字符串ID。

console.log( 'process.getgid()!!!!!! ' +  process.getgid() );
console.log( 'process.getuid()!!!!!! ' +  process.getuid() );
console.log( 'process.pid!!!!!! ' +  process.pid);
// __dirname 返回的是脚本所在的目录, process.cwd返回的是进程发起是的位置, 两者返回可能不一样.
// 假设在目录learn-node下执行 node dist/demo-process.js
//console.log( 'process.cwd!!!!!!!!:    ' +  process.cwd() );  // /private/var/www/learn-node/
//console.log( '__dirname!!!!!!!!:    ' +  __dirname );  // /private/var/www/learn-node/dist



function nextTick() {
  setTimeout(function(){
    console.log( '已经到了下一轮Event Loop! setTimeout' )
  });
// 放在下一轮事件循环( Event Loop )的尾部!!! 比`setTimeout`先执行
// 效率更高,不用检查时间!!!
  process.nextTick(function () {
    console.log('下一次Event Loop即将开始! process.nextTick');
  });
}


// !! on 监听各种事件, 并指定回调函数
//data事件：数据输出输入时触发
//SIGINT事件：接收到系统信号SIGINT时触发，主要是用户按Ctrl + c时触发。
//SIGTERM事件：系统发出进程终止信号SIGTERM时触发
//exit事件：进程退出前触发

// process监听Node的一个全局性事件uncaughtException，只要有错误没有捕获，就会触发这个事件。
process.on('uncaughtException', function(err){
  console.log('got an error: %s', err.message);
  process.exit(1);
});

// 接收到系统信号SIGINT时触发: 在大多数终端下，一个发送 SIGINT 信号的简单方法是按下 ctrl + c 。
process.on('SIGINT', function() {
  // 忽视
  //console.log("Ignored Ctrl-C");

  // 退出
  //console.log('Got a SIGINT. Goodbye cruel world');
  //process.exit(0);

  // 提示,可退出, 但只知道可以用 Ctrl + D 退出,其他不知道, 是否可设置, 是否可改 --
  console.log('收到 SIGINT 信号。  退出请使用 Ctrl + D ');
});

// 表示内核要求当前进程停止, 进程可以自行停止, 也可以忽略这个信号!
// 进程接收到SIGTERM 信号后, 关闭服务器, 然后退出进程.
// * 这时进程不会马上退出,而是要回应完最后一个请求! 处理完所有回调函数, 然后再退出!!!
process.on('SIGTERM', function () {
  //server.close(function () {
  //  process.exit(0);
  //});
  console.log('收到 SIGTERM 信号。  退出请使用 Ctrl + D ');
  process.exit(0);

});


//process.kill 用来对指定ID的线程发送信号, 默认 ' SIGINT信号
// 500毫秒后向当前进程发送SIGTERM信号（终结进程），
// 发出系统信号, 就会导致进程退出!!  $ kill -s SIGINT [process_id]kill // 也可以是SIGTERM事件, process_id 为 process.pid
setTimeout(function(){
  console.log('sending SIGTERM to process %d', process.pid);
  //process.kill(process.pid, 'SIGINT');
  //process.kill(process.pid, 'SIGTERM');  // 感觉与kill命令行异曲同工, 实现原理可有差别???
}, 500);

//const unhandledRejections = new Map();
process.on('unhandledRejection', function(reason, p) {
  unhandledRejections.set(p, reason);
});

process.on('rejectionHandled', function(p) {
  unhandledRejections.delete(p);
});



// process.exit方法用来退出当前进程(会触发exit事件!)。它可以接受一个数值参数，如果参数大于0，表示执行失败；如果等于0表示执行成功。
function exit( ) {
  if (1) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
// 监听退出
// 注意，此时回调函数只能执行同步操作，不能包含异步操作(EX: setTimeout, nextTick)，因为执行完回调函数，进程就会退出，无法监听到回调函数的操作结果。
//process.on('exit', function(code) {
//  console.log(`About to exit with code: ${code}`);
//  // 设置一个延迟执行
//  setTimeout(function() {
//    console.log('主事件循环已停止，所以不会执行');
//  }, 0);
//  process.nextTick(function () {
//    console.log('exit, 在当前的事件循环末尾, 但也不会执行');
//  });
//  console.log('退出前执行');
//});


// beforeExit:
// beforeExit事件在Node清空了Event Loop以后，在没有任何待处理的任务时触发。
// 正常情况下，如果没有任何待处理的任务，Node进程会自动退出，
// 设置beforeExit事件的监听函数以后，就可以提供一个机会，再部署一些任务，使得Node进程不退出。
// beforeExit事件与exit事件的主要区别是，beforeExit的监听函数可以部署异步任务，而exit不行。
// 此外，如果是显式终止程序（比如调用process.exit()），或者因为发生未捕获的错误，而导致进程退出，
// 这些场合不会触发beforeExit事件。因此，不能使用该事件替代exit事件。





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


// 全局变量:  __filename __dirname(运行的脚本的所在文件夹及所在目录)
var srcPath = path.join(__dirname, '../lib');
var destPath = path.join(__dirname, '../test');
//copy(srcPath, destPath, function (err) {
//  console.log(err);
//});

