/**
 * Created by sunzhimin on 18/08/16.
 */

// 每个项目的根目录下,一般都有一个package.json文件,定义了这个项目所需要的各种模块,
// 以及项目的配置信息(比如名称, 版本, 许可证等`元数据`)
// $ npm install 命令根据这个配置文件,自动加载所需模块,也就是配置项目所需的运行和开发环境
// $ npm install express --save        // 写入dependencies属性
// $ npm install express --save-dev    // 写入devDependencies属性
// npm
//
//
//

// package.json 文件内部就是一个JSON对象, 该对象的每一个成员就是当前项目的一项设置
  // 可以手工编写,也可以 npm init 命令自动生成
var a = {
  "name": "hello",    // require
  "version": "1.0.0", // require ( 大版本.次要版本.小版本)
  "author": "zhimin",
  "description": "package文件说明",
  "main": "gulpfile.js",  // 入口 指定了加载该模块时的入门文件, 默认是模块根目录下面的 index.js
  "config" : { //用于向环境变量输出值 EX: http.createServer(...).listen(process.env.npm_package_config_port)
    "port" : "8080" // 用户可以改变这个值: $ npm config set hello:port 80
  },
  "preferGlobal": "true",  // bool 表示当用户不将该模块安装为全局模块时（即不用–global参数），要不要显示警告，表示该模块的本意就是安装为全局模块
  "bin": {  // 用来指定各个内部命令对应的可执行文件的位置
    // 由于 node-modules/.bin/目录会在运行时加入系统的PATH变量, 因此在运行npm时,可以不带路径,直接通过命令来调用这些脚本
    // 所有的node-modules/.bin/目录下的命令,都可以用 npm run [命令] 的格式运行 :
    // 在命令行下，键入npm run，然后按tab键，就会显示所有可以使用的命令。
    "someTool": "./bin/someTool.js" // someTool命令对应的可执行文件为 bin 子目录下的 someTool.js(建立符号链接 npm_modules/.bin/someTool)
  },
  "scripts": {   // 指定了运行脚本命令的npm命令行缩写
    // 以npm run lint为例，执行这条命令之前，npm会先查看有没有定义prelint和postlint两个钩子，如果有的话，就会先执行npm run prelint，然后执行npm run lint，最后执行npm run postlint。
    "prelint": "echo here it comes!",
    "postlint": "echo there it goes!",
    "lint": "jshint **.js",
    "test": "mocha test/*.js", // npm run-script test或者npm run test，就会执行mocha test/*.js(对应的脚本命令)
    "build": "npm run test && npm run lint",  // 先后运行 &&
    "bean": "npm run test & npm run lint",  // 同时运行 &
    "start": './node_modules/.bin/someTool.js build'  // 可简写为下方 -- ?? 并不是在 .bin 目录下
    //"start": "someTool index.js"  // npm run/run-script start
  },
  "repository": {
    "type": "git",
    "url": "http://path/to"
  },
  "keywords": [
    "app",
    "node.js",
    "javascript"
  ],
  "license": "ISC",   // "MIT"
  "engines": {"node": "0.10.x"},  // 指明了该项目所需要的node.js 版本
  "browser": {  // 指定该模板供浏览器所用的版本 -- ?? Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。
    "tipso": "./node_modules/tipso/src/tipso.js"
  },
  "style": [ // 供浏览器使用时, 样式文件所在的位置  -- ?? 样式文件打包工具parcelify，通过它知道样式文件的打包位置。
    "./node_modules/tipso/src/tipso.css"
  ],
  "man" :[ "./doc/calc.1" ], // 指定当前模块的man文档的位置
  "homepage": "http://underscorejs.org",
  "bugs": {
    "url": "http://",
    "email": "##@xx.com"
  },
  "dependencies": {  // 指定了项目运行所依赖的模块
    "express": "latest",
    "javascript": "~3.1"
  },
  "devDependencies": {  // 指定了项目开发所需要的模块  : 模块名: 对应的版本要求
    "gulp": "3.9.0",                // 指定的 3.9.0 版本
    "gulp-babel": "~6.1.2",         // 表示安装 6.1.2 <= X < 6.2 版本(前两位数字(大版本和次要版本)固定 )
    "gulp-sourcemaps": "^1.6.2",    // 表示安装 1.6.2 <= X < 2 版本 大版本固定  如果大版本为0, 等同于~(即大版本和次要版本)见下行
    "gulp-clean-css": "^0.6.2",     // 表示安装 0.6.2 <= X < 0.6 即大版本和次要版本固定
    "gulp-concat": "latest",        // 安装最新版本
  }
};
