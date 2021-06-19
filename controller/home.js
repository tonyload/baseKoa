// const HomeService = require("../service/home")
 module.exports = {
    index: async(ctx, next) => {
        ctx.response.body = `<h1>index page123</h1>`
    },
    home: async(ctx, next) => {
        console.log(ctx.request.query)
        console.log(ctx.request.querystring)
        ctx.response.body = '<h1>HOME page</h1>'
    },
    homeParams: async(ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    login: async(ctx, next) => {
        await ctx.render("home/login",{
            btnName:"gogogo"
        })

    },
    register: async(ctx, next) => {

        // 解构出 app 实例对象
        const { app } = ctx
        let {
            name,
            password
        } = ctx.request.body
        let res = await app.service.home.register(name, password)
        if(res.status == "-1"){
            await ctx.render("home/login", res.data)
          }else{
            ctx.state.title = "个人中心"
            await ctx.render("home/success", res.data)
          }


    }


 }