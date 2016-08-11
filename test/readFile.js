/**
 * Created by sunzhimin on 22/07/16.
 */

var fs = require('fs');

function copy(src, dst) {
  console.log(src, dst);
  // 源文件路径 目标文件路径
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));  //适合大文件
  //fs.writeFileSync(dst, fs.readFileSync(src));  // 适合小文件
}

function main(argv) {
  copy(argv[0], argv[1]);
}

// process是一个全局变量，可通过process.argv获得命令行参数。
// 由于argv[0]固定等于NodeJS执行程序的绝对路径，argv[1]固定等于主模块的绝对路径，
// 因此第一个命令行参数从argv[2]这个位置开始。
//main(process.argv);

// 可是... 为啥我这里只有前两条啊...
main(process.argv.slice(2));

console.log(process.argv);