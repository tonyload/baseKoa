const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const miSend = require('./mi-send')

// 引入日志中间件
const miLog = require('./mi-log')

//引入跨域
// const cors = require("koa2-cors")

const miHttpError = require("./mi-http-error")

const miRule = require('./mi-rule');

module.exports = (app) => { 

  miRule({
      app,
      rules: [{ //指定controller文件夹下的js文件，挂载在app.controller属性
              folder: path.join(__dirname, '../controller'),
              name: 'controller'
          },
          { // 指定service文件夹下的js文件，挂载在app.service属性
              folder: path.join(__dirname, '../service'),
              name: 'service'
          }
      ]
  });

  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  }));

  // 注册中间件
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  
  // 指定 public目录为静态资源目录，用来存放 js css images 等
  app.use(staticFiles(path.resolve(__dirname, "../public")))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));

  app.use(bodyParser())
  app.use(miSend())
  // app.use(cors())


}                                                                                                                                                                                                                                                              