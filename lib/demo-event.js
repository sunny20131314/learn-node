/**
 * Created by sunzhimin on 23/08/16.
 * Events
 */
//Events模块是Node对“发布/订阅”模式（publish/subscribe）的实现。
// 一个对象通过这个模块，向另一个对象传递消息。

// 通过 EventEmitter属性, 提供了一个构造函数, 该构造函数的实例具有 on方法, 可以用来监听事件并触发回调函数.
// 任意对象都可以发布(emit)指定事件, 被 EventEmitter实例的on方法监听到!!!
  // EventEmitter对象的事件触发和监听是同步的, 只有当事件的回调函数执行以后, 函数f才会继续执行.
var EventEmitter = require( 'events' ).EventEmitter;
var emitter = new EventEmitter();  // 实例, 这个实例就是消息中心

// 超过10个回调函数,会发出一个警告, 可以通过下面的方法改变这个门槛值~
emitter.setMaxListeners(20);

// 通过on方法, 用来监听事件并触发回调函数!
// 当前实例对象监听当前实例对象的方法
emitter.on( 'someEvent', function(a, b, c) {
  console.log( a, b, c );
  console.log( 'on: event has occured!!!' );
});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});
emitter.on( 'someEvent', function() {console.log( '~~~~~~~~~~~~' );});

// addListener 是 on的别名
function addListener (a, b, c) {
  console.log( a, b, c );
  console.log( 'addListener: event has occured!!!' );
}
emitter.addListener( 'someEvent', addListener);

// 监听仅仅是一次性的, 使用后移除!!
emitter.once( 'once', function() {
  console.log( 'once: 我只执行一次!!!!!!!' );
});

function fn( ) {
  // 第一个参数: 事件名称
  // 其余参数会依次传入回调函数

  // 这个实例会监听到该事件someEvent, 只要是这个实例上的监听, 都会触发
  emitter.emit( 'someEvent', 1, 2, 3 );
  // once 返回一个 EventEmitter 对象, 因此可以链式的加载监听函数
  emitter.emit( 'once' );
  emitter.emit( 'once' );  // 不执行
  emitter.emit( 'once' );  // 不执行


  // 接受一个事件名称作为参数, 返回该时间的所有回调函数组成的数组!
  console.log(emitter.listeners("someEvent"));


  // 移除emitter实例上, 事件名称为 someEvent且回调函数为 addListener,
  // 回调函数,必须是指向同一个function才有效
  // 接收两个参数,
  // 第一个参数: 事件名称
  // 第二个参数: 回调函数名称(匿名函数不可移除)
  emitter.removeListener( 'someEvent',  addListener);


  // 无效, 回调是一个新的函数!! 虽然内容一致, 但是指向堆的地址完全不同
  emitter.removeListener( 'someEvent',  function(a, b, c) {
    console.log( a, b, c );
    console.log( 'on: event has occured!!!' );
  });

  // 移除某个事件的所有回调
  // 不带参数时, 移除所有事件的回调函数
  emitter.removeAllListeners( 'someEvent');  // emitter上的实例事件都被移除
  emitter.emit( 'someEvent', 4, 5, 6 );

  // 返回空数组, ∵ removeAllListeners取消了someEvent事件的回调函数
  console.log(emitter.listeners("someEvent"));

}

fn();

module.exports = emitter;





