/**
 * Created by sunzhimin on 03/08/16.
 * node 可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作，
 * 这使得 NodeJS 可以把多个程序组合在一起共同完成某项工作
 */

// 运行终端

var path = require('path');

// 运行终端 复制目录
var child_process = require('child_process');
var util = require('util');
function copy(source, target, callback) {
  child_process.exec(
    util.format('cp -r %s/* %s', source, target), callback);
}

console.log(process);
var srcPath = path.join(__dirname, '../lib');
var destPath = path.join(__dirname, '../test');
copy(srcPath, destPath, function (err) {
  console.log(err);
});