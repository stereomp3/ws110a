import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const router = new Router(); 

router
  .get("/(.*)", async (ctx) => {
    await send(ctx, ctx.params[0],{
      root: Deno.cwd(),
      index: "index.html"
    })
  })
  .get("/assets/(.*)", async (ctx) => { //get("/", func())根目錄顯示
   await send(ctx, ctx.params[0],{
    root: Deno.cwd() + "/assets", 
    })
  })
  .get("/script/(.*)", async (ctx) => { //get("/", func())根目錄顯示
   await send(ctx, ctx.params[0],{
    root: Deno.cwd() + "/script", 
    })
  })

const app = new Application();
app.use(router.routes()); 
app.use(router.allowedMethods()); 

console.log('start at : http://127.0.0.1:6020')
await app.listen({ port: 6020 }); 