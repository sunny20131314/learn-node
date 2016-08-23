/**
 * Created by sunzhimin on 23/08/16.
 */

var emitter = require( './demo-event' );

// 只能够触发同一实例的someEvent事件!
function fn( ) {
  console.log( 'start' );
  // 触发 -- ??  在某一实例上触发, 另一EventEmitter实例, 是否可监听, 模块之间呢?
  emitter.emit( 'someEvent' );
  // 事件触发及监听是同步, 会等到on事件触发,
  console.log( 'end' );
}

fn();
// EventEmitter对象的事件触发和监听是同步的, 只有当事件的回调函数执行以后, 函数f才会继续执行(`EX: end`).
// start
// event has occured
// end







