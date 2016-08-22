/**
 * Created by sunzhimin on 22/08/16.
 * uncaughtException事件中的异步处理
 * 可见 intro-error uncaughtException部分有相关文字说明
 */

// process监听Node的一个全局性事件uncaughtException，只要有错误没有捕获，就会触发这个事件。
process.on('uncaughtException', function(err){
  console.log('got an error: %s', err.message);
  console.log('This will 2 run.'); // 会执行

  // 异步都不执行
  process.nextTick(function() {
    console.log('nextTick uncaughtException回调 本行依旧会执行!!!!!!!!!!!!!!!!!! \n');
  }, 200);
  setTimeout(function() {
    console.log('setTimeout uncaughtException回调 本行不不不不不不不不不不会执行!!!!!!!!!!!!!!!!!! \n');
  }, 200);
  process.exit(1);
});

setTimeout(function(){
  throw new Error('fail');  // 抛出错误
}, 100);
console.log('This will 1 run.');

process.nextTick(function() {  // 会执行
  console.log('nextTick 本行依旧会执行********************************************* \n');
}, 100);

setTimeout(function() {
  console.log('setTimeout 本行不不不不不不不不不不不不会执行********************************************* \n');
}, 100);
