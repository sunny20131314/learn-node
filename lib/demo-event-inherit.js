/**
 * Created by sunzhimin on 23/08/16.
 * Events:  其他模块也可以部署 EventEmitter 接口, 从而也可以订阅和发布信息
 */


var EventEmitter = require( 'events' ).EventEmitter;

// method1
function Dog( name ) {
  this.name = name;
}

Dog.prototype.__proto__ = EventEmitter.prototype;

//Dog.prototype = Object.create( EventEmitter.prototype );

var  simon = new Dog( 'simon' );

simon.on( 'bark', function () {
  console.log( this.name  + ' barked');
});

//setInterval(function () {
  //simon.emit( 'bark' );
//}, 500);


// method2
// Node 内置模块 util 的 inherits 方法
var util = require( 'util' );

// Radio 是一个构造函数, 实例继承了 EventEmitter接口
var Radio = function(station) {
  var self = this;
  setTimeout(function() {
    self.emit( 'open', station );
  }, 0);

  setTimeout(function() {
    self.emit( 'close', station );
  }, 5000);

  // 添加新的回调函数时触发 会触发两次
  this.on( 'newListener', function (listener) {
    console.log( 'Event Listener: ' + listener );
  } )
};

util.inherits( Radio, EventEmitter );


var station = {
  freq: '80.16',
  name: 'Rock N Roll Radio'
};

var radio = new Radio( station );
radio.on('open', function(station) {
  console.log('"%s" FM %s 打开', station.name, station.freq);
  console.log('♬ ♫♬');
});

radio.on('close', function(station) {
  console.log('"%s" FM %s 关闭', station.name, station.freq);
});



