/**
 * Created by sunzhimin on 18/08/16.
 */

// Path

//path.normalize
//将传入的路径转换为标准路径，具体讲的话，除了解析路径中的.与..外，还能去掉多余的斜杠。如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性。

// path.join() 用于连接路径, 主要用途在于, 会正确使用当前系统的路径分隔线, unix下是 '/', windows下是 '\'

// path.resolve() 将相对路径转化为绝对路径, 该方法的返回值不带尾部的斜杠
// 它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径。
// 如果根据参数无法得到绝对路径，就以当前所在路径作为基准。除了根目录，该方法的返回值都不带尾部的斜杠。
path.resolve('/foo/bar', './baz');
//'/foo/bar/baz'
path.resolve('/foo/bar', '/tmp/file/');
//'/tmp/file' // -- ?? 因为把最后一个参数解析为了绝对路径???
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
//'/private/var/www/learn-node/wwwroot/static_files/gif/image.gif'

// accessAsync() 同步读取一个路径
// 下面的代码可以用于判断一个目录是否存在。
function exists(pth, mode) {
  try {
    fs.accessSync(pth, mode);
    return true;
  } catch (e) {
    return false;
  }
}

// path.relative 接收两个参数,这两个参数都应该是绝对路径, 该方法返回第二个路径相对于第一个路径的相对路径
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'); // '../../impl/bbb'
path.relative('/data/orandea/test/aaa', '/data/orandea/test/aaa'); //  相同 -> ''


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

  // join 将传入的多个路径拼接为标准路径
  store( path.join('foo/', './ban/', '../bad'), 4);  // -> 'foo/bad'
  store( path.join('foo', '/baz/abc/def', '../bar'), 5);  // -> 'foo/baz/abc/bar'
  console.log(cache);

}
//pathAPI();
