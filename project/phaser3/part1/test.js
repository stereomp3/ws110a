import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const router = new Router(); 

router
  .get("/(.*)", async (ctx) => {
    await send(ctx, ctx.params[0],{
      root: Deno.cwd(),
      index: "main.html"
    })
  })
  .get("/assets/(.*)", async (ctx) => { //get("/", func())根目錄顯示
   await send(ctx, ctx.params[0],{
    root: Deno.cwd() + "/assets", 
    })
  })
  .get("/data/picture/(.*)", async (ctx) => { 
   await send(ctx, ctx.params[0],{
    root: Deno.cwd() + "/data/picture", 
    })
  })

const app = new Application();
app.use(router.routes()); 
app.use(router.allowedMethods()); 

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 }); 