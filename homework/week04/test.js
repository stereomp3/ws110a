import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import {ViewManeger} from './View.js';
import {LogicManeger} from './Controller.js';


const view = new ViewManeger()
const maneger = new LogicManeger()
const router = new Router();
//// obj.func, 不能直接被 oak router 呼叫。必須包成 (ctx)=>obj.func(ctx)
router.get('/', (ctx)=>view.list(ctx))
    .get('/post/new', view.add)
    .get('/post/:id', view.show)
    .post('/post', maneger.create) // 如果有很多字用post，較安全，不會把內容貼到網址上，貼在文內部
    .get('/(.*)', async (ctx) => {
        await send(ctx, ctx.params[0], {
            root: Deno.cwd(),
            index: "layout.css", 
        }) 
    })
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
  