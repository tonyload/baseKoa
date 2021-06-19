const router =require("koa-router")()
module.exports = (app)=>{
  router.get("/",app.controller.home.index)
  router.get("/home",app.controller.home.home)
  router.get('/home/:id/:name', app.controller.home.homeParams)
  router.get('/user', app.controller.home.login)
  router.post('/user/register', app.controller.home.register)
  app.use(router.routes())
  .use(router.allowedMethods()) //从源码中我们可以看到.allowedMethods处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
}