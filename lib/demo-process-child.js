/**
 * Created by sunzhimin on 23/08/16.
 */

/*
* 新建子进程
* 子进程的运行结果储存在 系统缓存中 -> 最大 200kb
 * 子进程结束以后, 主进程再用回调函数读取子进程的运行结果! */

// exec
// !!exec 用于新建一个子进程, 然后缓存运行结果, 运行结束后再调用函数
var exec = require('child_process').exec;
// exec方法最多可以接受两个参数，
// exec 方法会直接调用 /bin/sh 程序来解释命令, 所以如果有用户输入的参数, exec方法是不安全的, 这种情况最好使用execFile方法!

// 写法一
// 第一个参数: 所要执行的shell命令，
// 第二个参数: 回调函数，该函数接受三个参数，分别是发生的错误、标准输出的显示结果、标准错误的显示结果。
function ls ( ) {
  var ls = exec('ls -l', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('ls Error code: ' + error.code);
    }
    console.log('ls Process STDOUT: ' + stdout + '!!!!!!!');
  });
  //ls.on( 'close', function (code) {
  //  console.log( 'ls code: ' + code );
  //});
}


// 写法二,
// -- 这种写法, 监听错误, 还是在回调函数中???
function child () {
  var child = exec( 'ls -l' );
// 监听data事件以后, 可以实时输出结果, 否则只有等到子进程结束, 才会输出结果.
// 当子进程运行时间较长时, 第二种方式更适合
  child.stdout.on( 'data', function (data) {
    console.log( 'child stdout: ' + data );
  });
  child.stderr.on( 'data', function (data) {
    console.log( 'child stderr: ' + data );
  });
// 子进程本身有close事件, 可以设置回调函数
  child.on( 'close', function (code) {
    console.log( 'child closing code: ' + code );
  });

}

// EP:
// 上面两种写法,
// 方法一没有监听子进程关闭时, 方法二的结果先返回     child stdout -> ls STDOUT -> child code
// 方法一 监听子进程关闭时, 方法二的结果先返回   child stdout -> ls STDOUT -> ls code -> child code
function node () {
  exec('node -v', function(error, stdout, stderr) {
    if (error !== null) {
      console.log('node -v exec error: ' + error);
    }
    stdout && console.log('node -v stdout: ' + stdout);
    stderr &&  console.log('node -v stderr: ' + stderr);
  });
}

// 用户可输入  -- 新版本可能已解决?
// 在bash环境下，ls -l; user input会直接运行。如果用户输入恶意代码，将会带来安全风险。
// 因此，在有用户输入的情况下，最好不使用exec方法，而是使用execFile方法。
function execInput () {
  var path = ";user input";
  exec('ls -l ' + path, function (err, data) {
    console.log(data);
  });
}



// execSync
// exec 同步版本
var execSync = require("child_process").execSync;
var path = require( 'path' );
function myExecSync(cmd) {
  var SEPARATOR = process.platform === 'win32' ? ';' : ':';
  var env = Object.assign({}, process.env);

  env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

  // 第一个参数: 所要执行的命令，
  // 第二个参数用来配置执行环境。
  // execSync方法的第二个参数是一个对象。该对象的cwd属性指定脚本的当前目录，env属性指定环境变量。
  var output = execSync(cmd, {
    cwd: process.cwd(),
    env: env
  });

  console.log( 'output -> ', output, 'output.toString("utf-8") ->', output.toString('utf-8'));  // <Buffer >
}

//myExecSync('node');



// execFile 直接执行特定的程序，参数作为数组传入，不会被bash解释，因此具有较高的安全性。
var child_process = require('child_process');
function childProcess() {
  var path1 = ".";
  child_process.execFile('/bin/ls', ['-l', path1], function (err, result) {
    console.log(result)
  });
}


// spawn
// spawn方法创建一个子进程来执行特定命令，用法与execFile方法类似，但是没有回调函数，只能通过监听事件，来获取运行结果。它属于异步执行，适用于子进程长时间运行的情况。
// 第一个参数: 可执行文件，
// 第二个参数: 参数数组。
//child_process.exec(command, [options], callback)
//child_process.spawn(command, [args], [options])



// fork
//fork方法直接创建一个子进程，执行Node脚本，
// fork('./child.js') 相当于 spawn('node', ['./child.js']) 。
// 与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
// fork方法返回一个代表进程间通信管道的对象，对该对象可以监听message事件，
// 用来获取子进程返回的信息，也可以向子进程发送信息。
function fork () {
  var n = child_process.fork( path.join(__dirname, './demo-process-child-pass.js'));
  n.on('message', function(m) {
    console.log('PARENT got message:~~~~ ', m);
  });
  n.send({ hello: 'world' });

}
fork();











