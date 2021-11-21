import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const router = new Router(); 

router
  .get("/(.*)", async (ctx) => {
    await send(ctx, ctx.params[0],{
      root: Deno.cwd(),
      index: "test.html"
    })
  })
const app = new Application();

app.use(router.allowedMethods()); 
app.use(router.routes()); 

console.log('start at : http://127.0.0.1:6789')
await app.listen({ port: 6789 }); 