/**
 * Created by sunzhimin on 16/08/16.
 *
 * error
 */

// 常用三种方式:
// 1. throw 语句抛出错误对象, 抛出异常
// 2. 将错误对象抛给回调函数,由回调函数负责发出错误
// 3. 通过EventEmitter接口发出一个error事件


// 1. try catch 无法对异步运行的代码抛出异常
try {
  // process.nextTick or setTimeout 在下一轮事件循环抛出异常
  // 都无法被catch代码块捕获, ∵ catch代码块所在的那部分已经结束了!
  //process.nextTick( function() {
  //  throw new Error( 'error1.1' );
  //});
}
catch (err){
  // can not catch err
  console.error( err );
}

// 1.2 将错误捕获也放在异步中执行!
function async( cb, err ) {
  setTimeout(function() {
    try {
      if ( true ) {
        //throw new Error( 'woo~' );
      }
      else
        cb( 'done' );
    }
    catch (e) {
      err(e);
    }
  }, 2000)
}
async( function(res) {
  console.log( 'received1.2:', res );
}, function(err) {
  console.log('Error1.2: async threw an exception: ', err )
});
// Error: async threw an exception: woo~


// 2. 回调函数
// 回调函数的第一个参数就是一个错误对象, 为了解决处理异步操作抛出的错误
// 如果没有发生错误,回调函数的第一个参数就传入null(只要判断就可以知道有没有出错,而且还可以层层传递错误)
function async2( continuation ) {
  setTimeout( function () {
    try {
      var res = 42;
      if (true) {
        //throw new Error( 'woop!!!!!!' );
      }
      else
        continuation(null, res)
    }
    catch (e) {
      continuation(e, null)
    }
  }, 2000)
}
async2(function( err, res ) {
  if (err) {
    // 除了放过No permission 错误意外, 其他错误传给下一个回调
    if ( !err.noPermission ) {
      return next(err); // -- next 在这里应该是指res吧!
    }
    console.log('Error2: failed: ', err );
  }
  else {
    console.log('received:', res);
  }
});


// 3. EventEmitter接口的error事件!
var EventEmitter = require( 'events').EventEmitter;
var emitter = new EventEmitter();
//emitter.emit( 'error', new Error( 'error3: something bad happened' ) );

// node中必须对error事件进行监听, 否则有错误,会导致整个应用程序崩溃
//emitter.on( 'error', function (err) {
//  console.error('error3: ' + err.message );
//});


// 4 uncaughtException事件
// 当一个异常未被捕获,就会触发uncaughtException事件(比如1try&catch捕获的setTimeout及process.nextTick异步事件的错误),可以对这个事件注册回调函数,从而捕获异常.
// 只要给uncaughtException配置了回调, Node进程就不会异常退出, 但是上下文已经丢失,无法给出异常发生的详细信息.
// 而且异常可能导致Node不能正常进行内存回收, 出现内存泄漏.
// 部署该事件的监听函数, 是免于Node进程终止的最后措施, 否则Node就要执行Process.exit()! 抛出异常的错误之前部署的异步操作(setTimeout不会!!! process.nextTick倒是可以哦, 可能是版本更新所致), 还是会继续执行!只有完成以后, Node进程才会退出!
// 所以, 当uncaughtException触发后 ,最好记录错误日志, 然后结束Node进程
process.on( 'uncaughtException', function (err) {
  console.error('error4 caught in caughtException:', err);
  //logger( error ); // 日志 这个具体?? --
  process.exit(1); // 退出
} );


// 5 unhandledRejection 事件
// io.js 有一个unhandledRejection事件,用来捕获promise对象的状态
// unhandledRejection 事件的监听函数有两个参数,第一个是错误对象,第二个是产生错误的promise对象.
var http = require( 'http' );
http.createServer(function (req, res) {
  var promise = new Promise(function (resolve, reject) {
    reject( new Error( 'broken.' ) )
  } );

  promise.info = {url: req.url}

}).listen(8080);

process.on( 'unhandledRejection', function (err, p) {
  if (p.info && p.info.url ) {
    console.log('error in URL: ', p.info.url)
  }
  console.log( err.stack );
} );






