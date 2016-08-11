// Stream
// 只读
// 读写
// Path
// buffer:
// 遍历: 读取目录!!!
// 移动文件可以用 fs.rename() 来实现, 如果目标文件夹下有同名文件，则会被覆盖。
// 拷贝文件
// utf-8 格式
// 统一使用单字节编码来读取文件，不用关心文件的实际编码是 GBK 还是 UTF8。
// 把gbk的文件转换为 uft-8
// 把uft-8的文件转换为 gbk

var fs = require('fs');
var path = require('path');

var fileName = "../filtername.txt";
var sourceFile = path.join(__dirname, fileName);
var destPath = path.join(__dirname, "dist", fileName);

// Stream
//  Stream 基于事件机制工作，所有 Stream 的实例都继承于 NodeJS 提供的 EventEmitter。

// 只读
function readStream(pathname) {
  var rs = fs.createReadStream(pathname);

  function doSomething(data, callBack) {
    console.warn(data.toString('utf-8'), 'chunk~~~~  每一次获取的数据~~~');
    callBack();
  }

  rs.on('data', function (chunk) {
    rs.pause();  // 暂停数据读取

    // 以上代码给 doSomething 函数加上了回调，因此我们可以在处理数据前暂停数据读取，并在处理数据后继续读取数据。
    doSomething(chunk, function () {
      rs.resume(); //处理数据后继续读取数据。
    });
  });

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

  rs.on('end', function () {
    ws.end();
  });

  // 根据 drain 事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据了。
  ws.on('drain', function () {
    rs.resume();
  });
}


// Path
//path.normalize
//将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性。
function pathAPI() {
  var cache = {};

  // normalize: 标准化之后的路径里的斜杠在 Windows 系统下是\，而在 Linux 系统下是/。
  // 如果想保证任何系统下都使用/作为路径分隔符的话，需要用.replace(/\\/g, '/')再替换一下标准路径。
  function store(key, value) {
    cache[path.normalize(key.replace(/\\/g, '/'))] = value;
  }

  store('foo/bar/ddd', 1);
  store('foo//baz//../bac', 2);  // -> 'foo/bac'

  // 不同文件扩展名做不同操作时，该方法就显得很好用~~~
  store(path.extname('foo/bar.js'), 3 ); // -> '.js'

  // join 将传入的多个路径拼接为标准路径.
  store( path.join('foo/', './ban/', '../bad'), 4);  // -> 'foo/bad'
  store( path.join('foo', '/baz/abc/def', '../bar'), 5);  // -> 'foo/baz/abc/bar'
  console.log(cache);

}
//pathAPI();



// 拷贝文件
function copyFile(src, dst) {
  // 源文件路径与目标文件路径
  // __dirname 是当前执行文件的路径

  // 1: 对于大文件，边读边处理，直到完成拷贝。避免一次读取放在内存中, 再一次性写入磁盘.
  // 以上程序使用 fs.createReadStream 创建了一个源文件的只读数据流，
  // 并使用 fs.createWriteStream 创建了一个目标文件的只写数据流，
  // 并且用 pipe 方法把两个数据流连接了起来。
  //var readStream = fs.createReadStream(sourceFile);
  //var writeStream = fs.createWriteStream(destPath);
  //readStream.pipe(writeStream);

  // 1 or
  //fs.createReadStream(src).pipe(fs.createWriteStream(dst));

  // 2: 小文件拷贝 - 同步
  fs.writeFileSync(dst, fs.readFileSync(src));
  console.log("移动完成");

}
//copyFile(sourceFile, destPath);


// 移动文件可以用 fs.rename() 来实现, 如果目标文件夹下有同名文件，则会被覆盖。
function moveFile(src, dst) {
  fs.rename(src, dst, function (err) {
    // sourceFile 是读取文件的路径,
    // destPath 是写文件的路径
    if (err) throw err;
    fs.stat(dst, function (err, stats) {
      if (err) throw err;
      console.log('stats: ' + stats );
    });
  });
}
//moveFile(sourceFile, destPath);


// 遍历: 读取目录!!!
// 在遍历时一般使用深度优先+先序遍历算法。
// 该函数以某个目录作为遍历的起点。遇到一个子目录时，就先接着遍历子目录。遇到一个文件时，就把文件的绝对路径传给回调函数。回调函数拿到文件路径后，就可以做各种判断和处理
function travelSync(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    // dir 目录, file 文件名
    var pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      travelSync(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}
//travelSync('/private/var/www/node/dist', function (pathname) {
//  console.log(pathname);
//});


function travel(dir, callback, finish) {
  fs.readdir(dir, function (err, files) {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i]);
        fs.stat(pathname, function (err, stats) {
          if (stats.isDirectory()) {
            travel(pathname, callback, function () {
              next(i + 1);
            });
          } else {
            callback(pathname);
            next(i + 1);
          }
        });
      } else {
        finish && finish();
      }
    }(0));
  });
}
//travel('/private/var/www/node/dist', function (pathname, callback) {console.log(pathname);callback && callback();}, function () {console.log('finish');});

// buffer:
// .slice方法也不是返回一个新的 Buffer，而更像是返回了指向原 Buffer 中间的某个位置的指针

// string 与 buffer 转换
var bin = new Buffer('hello', 'utf-8');  // -> <Buffer 68 65 6c 6c 6f> / [0x68, 0x65, 0x6c, 0x6c, 0x6f]
var str = bin.toString('utf-8'); // -> "hello"  // 转换为字符串

// 拷贝 buffer
function copyBuffer( bin ) {
  var dup = new Buffer(bin.length);
  bin.copy(dup);
  return dup;
}
//console.log( copyBuffer(bin) );


// 文本编码
// BOM 用于标记一个文本文件使用 Unicode 编码，其本身是一个 Unicode 字符（"\uFEFF"），位于文本文件头部。


// utf-8 格式
function readText(pathname) {
  var bin = fs.readFileSync(pathname);
  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }
  return bin.toString('utf-8');
}
//console.log(readText(path.join(__dirname, 'text.txt')));

// 统一使用单字节编码来读取文件，不用关心文件的实际编码是 GBK 还是 UTF8。
// GBK编码源文件内容 -> 使用单字节编码读取后得到的内容 -> 替换内容 -> 使用单字节编码保存后对应字 -> 使用 GBK 编码读取后得到内容
function replace(pathname) {
  var str = fs.readFileSync(pathname, 'binary');
  console.log(str);
  str = str.replace('foo', 'bar');
  fs.writeFileSync(pathname, str, 'binary');
}
//replace(sourceFile);

// 把gbk的文件转换为 uft-8
// 如果是数据流的话,使用相关 decodeStream
var iconv = require('iconv-lite');
function gbkToStr( pathname, dest ) {
  var str = fs.readFileSync(pathname);
  str = iconv.decode(str, 'GBK'); //return unicode string from GBK encoded bytes
  //var buf = iconv.encode(str, 'GBK');//return GBK encoded bytes from unicode string
  fs.writeFileSync(dest ? dest : pathname, str.toString('UCS2'));
}
gbkToStr(sourceFile, destPath);


// 把uft-8的文件转换为 gbk
function strToGbk( pathname, dest ) {
  var str = fs.readFileSync(pathname);
  console.log( str );
  str = iconv.encode(str, 'GBK');//return GBK encoded bytes from unicode string
  console.log( str );
  fs.writeFileSync(dest ? dest : pathname, str);
}
//strToGbk(sourceFile, destPath);

