/**
 * Created by sunzhimin on 23/08/16.
 */


// Stream
// Stream 基于事件机制工作，所有 Stream 的实例都继承于 NodeJS 提供的 EventEmitter。

// 使用setEncoding设定编码


// 可读数据流
// readable 属性: 监听该事件, 可取得和data事件同样的效果
// read()
// _read()
// setEncoding()
// pause 暂停数据传送
// resume 恢复数据传送
// isPaused()
// pipe()
// unpipe()
// 事件


// 可写数据流
//   writable属性
//   write()
//   cork()，uncork()
//   setDefaultEncoding()
//   end()
//   事件

// 事件
// readable、writable、drain、data、end、close等


var stream = require( 'stream' );
var Stream = stream.Stream;

var ws = new Stream;

ws.writable = true;

ws.write = function ( data ) {
  console.log( 'input = ' + data );
};

ws.end = function ( data ) {
  console.log( 'bye~~~~' );
};

process.stdin.pipe(ws);
// EX:
// fdds
//input = fdds
//
//bye~~~~


// 只读
function readStream(pathname) {
  var rs = fs.createReadStream(pathname);
  rs.setEncoding('utf8');  // 使用setEncoding设定编码
  function doSomething(data, callBack) {
    console.warn(data.toString('utf-8'), 'chunk~~~~  每一次获取的数据~~~');
    callBack();
  }

  // 每读入(或写入)一段数据, 就会触发一次data事件 监听data 事件, 获取每一个数据块
  // 数据流新建以后, 默认状态是暂停, 只有指定了data事件的回调函数, 或者调用了 resume方法, 数据才会开始发送
  rs.on('data', function (chunk) {
    rs.pause();  // 暂停数据读取

    // 以上代码给 doSomething 函数加上了回调，因此我们可以在处理数据前暂停数据读取，并在处理数据后继续读取数据。
    doSomething(chunk, function () {
      rs.resume(); //处理数据后继续读取数据。
    });
  });

  // 监听readable事件, 也可以取得与监听data事件同样的效果
  rs.on('readable', function () {
    var chunk;

    // 表示没看懂 --
    //  stream.read()
    while ( chunk = stream.read() ) {
      data += chunk;
    }

  });
  // 全部读取(/写入)完毕, 触发一次end事件!
  rs.on('end', function () {
    console.log('end~~~');
  });
}
//readStream(path.join(__dirname, 'helloWorld.js'));


// 读写
// 后边的大文件拷贝程序，NodeJS 直接提供了.pipe方法来做这件事情，其内部实现方式与下边的代码类似。
function writeStream(src, dst) {
  var rs = fs.createReadStream(src);
  var ws = fs.createWriteStream(dst);

  // 读写如同借助缓存区把货物从一处a传到另一处b,边装边卸货
  // 情况1: 如果托运工人搬出v < 搬进v, 货物就会顺利的放在b,不需要缓存区
  // 情况2: 如果托运工人搬出v > 搬进v, 货物来不及放在b处, 那么就会把货物放在缓存区.
  // 为了减少情况2, 增加了一个裁判员(pause), 当搬出v > 搬进v时, 搬出的工人就休息, 等待搬进的工人把货品搬完之后再继续工作(drain)

  rs.on('data', function (chunk) {
    // 根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了 -> 暂停
    if (ws.write(chunk) === false) {
      rs.pause();
    }
  });

  rs.on( 'error', function(err) {
    throw err;
  });

  rs.on('end', function () {
    ws.end();
  });

  // 根据 drain 事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。
  ws.on('drain', function () {
    rs.resume();
  });
}

