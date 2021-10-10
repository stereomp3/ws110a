import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import {VeiwManeger} from './View.js';
import {LogicManeger} from './Controller.js';


const view = new VeiwManeger()
const maneger = new LogicManeger()
const router = new Router();

router.get('/', view.list)
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
  