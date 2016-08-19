/**
 * Created by sunzhimin on 18/08/16.
 * 本地文件 读写(api)
 */

//readFile()，readFileSync()
// 不同系统的行结尾字符不同 判断
//writeFile()，writeFileSync()
//exists(path, callback)
// rmdirSync
//mkdir()，mkdirSync
//readdir()，readdirSync()
//stat()
//watchfile()，unwatchfile()
  //createReadStream(), createWriteStream()

var fs = require( 'fs' );
var path = require('path');

// 全局变量:  __filename __dirname (运行的脚本的所在文件夹及所在目录)
var sourceFile = path.join(__dirname, '../', 'gulpFile.js');
var putFile = path.join(__dirname, '../test/', 'write.js');


//readFile()，readFileSync()
// 对于流量大的服务器, 最好是采用异步操作, 因为同步操作时, 只有前一个操作结束, 才会开始后一个操作!
// 如果某一个操作耗时, 那么会导致整个程序停顿!
// readFile 异步读取数据
// 不要同时发起多个readFile请求(容易耗尽系统资源)
function readFile(sourceFile) {
  // 第一个参数: 文件路径
  // (第二个参数): 文本文件编码, 默认为null, 如果不指定,则返回`原始的缓存二进制数据`-Buffer实例:  需要调用buffer对象的toString方法,将其转为字符串
  //  可用的文件编码包括“ascii”、“utf8”和“base64”
  // 第二/三个参数: callback
  fs.readFile( sourceFile, function (err, buffer) {
    // 第一个参数: err
    // 第二个参数: buffer: 文件内容的Buffer实例
    if ( err ) throw err;
    //process( buffer );
    console.log(buffer, 'buffer~~~~~~~~~~~~~~~~~~~~~~~~');
  });
}
//readFile(sourceFile);

// readFileSync 同步读取文件 返回一个字符串
function readFileSync(sourceFile) {
  // 第一个参数: 文件路径,
  // 第二个参数: 文本文件编码, 默认为null, 如果不指定,则返回 Buffer实例
  //  可用的文件编码包括“ascii”、“utf8”和“base64”
  var text = fs.readFileSync(sourceFile, 'utf8');
  console.log(text, 'text~~~~~~~~~~~~~~~~~~~~~~~~');

// /?/ 0/1
  text.split(/\r?\n/).forEach(function (line) {
    //
    //console.log(line, 'line~~~~~~~~~~~~~~~~~~~~~~~~');
  });
}
//readFileSync(sourceFile);


// 不同系统的行结尾字符不同 判断
// linux: \n `换行` 每行结尾只有换行
// windows: \n\r `换行``回车` 每行结尾 换行 回车
// mac: \n `回车` 每行结尾只有回车
// windows的文件在linux/mac下打开, 每行最后会多一个^M符号(--)
// linux/mac的文件在windows下打开, 多行会变成一行
// 方法一，查询现有的行结尾字符
//var EOL1 = text.indexOf('\r\n') >= 0 ? '\r\n' : '\n';

// 方法二，根据当前系统处理
var EOL2 = (process.platform === 'win32' ? '\r\n' : '\n');


//writeFile()，writeFileSync()
// writeFile 异步写入文件
function writeFile( putFile ) {
  // 第一个参数: 文件路径
  // 第二个参数: 写入文件的字符串
  // 第三个参数: callback
  fs.writeFile(putFile, 'console.log(100);', function (err) {
    if( err ) throw err;
    console.log( 'it\'s saved!!!!!!!!!!!!!!!!!!!!!!!!!!' )
  });
}
//writeFile(putFile);

// 异步写入文件
function writeFileSync( putFile ) {
  // 第一个参数: 文件路径
  // 第二个参数: 写入文件的字符串
  // 第三个参数: 文件编码, 默认 utf8
  fs.writeFileSync(putFile, 'console.log(200);', 'utf8');
}
//writeFileSync(putFile);


//exists(path, callback)
// 判断给定路径是否存在, 不管结果如何, 都会调用callback
function exists (path) {
  var util = require( 'util' );
  fs.exists( path, function (exists) {
    // 第一个参数: bool 表示文件是否存在
    console.error( exists ? 'exist' : 'no file!' );  //util.debug
  });
}
//exists(__dirname);


// rmdirSync
// 异步移除目录 必须是空目录
function rmdirSync(path) {
  if ( fs.existsSync( path ) ) {
    console.log( 'Removing~~~~~~~~~' + path + '~~~~~~~~~');
    fs.rmdirSync(path);
  }
}
//rmdirSync( path.join( './aaa/'));


//mkdir()，mkdirSync
// mkdir 用于新建目录
function mkdir(path) {
  // 第一个参数: 目录名
  // 第二个参数: 权限值
  // 第三个参数: callback
  fs.mkdir( path, '0777', function (err) {
    if (err) throw err;
    console.log( 'adding~~~~~~~' + path );
  });
}
//mkdir('./aaa');

// mkdirSync
function mkdirSync ( path ) {
  fs.mkdirSync( path, '0777' );
}
//mkdirSync( './aaa' );


//readdir()，readdirSync()
// readdir 读取目录, 返回一个所包含的文件和子目录的数组
function readdir ( dest ) {
  fs.readdir( dest, function (err, files) {
    if (err) throw err;

    var count = files.length;
    var res = {};   // 文件
    files.forEach(function (filename) {
      // 需要判断是目录还是文件 --
      fs.stat( path.join(dest, filename), function (err, stats) {
        if (err) throw err;

        // stats.isDirectory () 判断是否是目录
        if (stats.isFile()) {
          console.log("%s is file", filename);
          fs.readFile( filename, function(data) {
            res[filename] = data;
            count--;
            if (count <= 0) {
              // 对文件的处理
            }
            console.log(res, Object.keys(res), 'res!!!!!!!!!!!!!!!');
          })
        }
        else if (stats.isDirectory ()) {
          console.log("%s is a directory", filename);
        }
        //console.log('stats:  %s ~~~~~~~~', JSON.stringify(stats));
      });
    });
    // 执行顺序, files.forEach肿么像是异步的啊. 因为里面的readFile是异步啊~~~~
    console.log(res, 'res~~~~~~~~~~~~~');
  });
}
//readdir ( process.cwd() );

// readdirSync 同步读取目录 --
function readdirSync ( dir ) {
  var files = fs.readdirSync(dir);
  files.forEach(function (filename) {
    var fullname = path.join(dir,filename);
    var stats = fs.statSync(fullname);
    if (stats.isDirectory()) filename += '/';
    process.stdout.write(filename + '\t' +
      stats.size + '\t' +
      stats.mtime + '\n'
    );
  });
}
//readdirSync( process.cwd() );


//stat()
// 参数是一个文件或目录,塔产生一个对象, 该对象包含了该文件或目录的具体信息.
// 通过该方法可以判断正在处理的是文件还是一个目录,
// EX: 具体参考 //readdir()，readdirSync()


//watchfile()，unwatchfile()
// 应当用watch替代
// watchfile 监听一个文件,如果文件发生变化, 就会自动触发该callback
function watchfile ( path ) {
  fs.watchFile( path, function (curr, prev) {
    console.log('~~~~~~~~~~~~~~the current mtime is: ' + curr.mtime);
    console.log('~~~~~~~~~~~~~~the previous mtime was: ' + prev.mtime);
  });

  fs.writeFile( path, "changed1", function (err) {
    if (err) throw err;

    console.log("file write complete");
  });

  fs.writeFile( path, "changed2", function (err) {
    if (err) throw err;

    console.log("file write complete");
  });

  //fs.unwatchfile( path );

  fs.writeFile( path, "changed3", function (err) {
    if (err) throw err;

    console.log("file write complete");
  });
}
watchfile('./testFile.txt');
// unwatchfile 方法用于解除对文件的监听。


//createReadStream(), createWriteStream()
// createReadStream 往往用来打开大型的文本文件, 创建一个读取操作的数据流.
// 大型的文本文件( 指体积很大,读取操作的缓存装不下, 只能分成几次发送, 每次发送会触发一个data事件, 发送结束会触发end事件)
function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    console.log( 'data~~~~~~~~~', data );
    var index = remaining.indexOf('\n');  // 获得换行的
    var last  = 0;
    // 打印出每一行!
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    console.log( 'end~~~~~~~~~' );
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
}

var input = fs.createReadStream(sourceFile);
//readLines(input, func);

// createWriteStream
// 创建一个写入数据流对象, 该对象的write方法用于写入数据,end结束写入操作
function writeData( path ) {
  //var out = fs.createReadStream( path, {
  //  encoding: 'utf8'
  //});
  var out = fs.createReadStream( path );

  out.write('fdsfdsfdsfds');  // -- ?? 报错, not a function
  out.end();
}
// --
writeData( './testFile.txt' );






