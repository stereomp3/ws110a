import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './public/render.js'


const posts = [
    {id:0, title:'吃飯', body:'吃學餐', date:"2021: November/8, 12:20"},
    {id:1, title:'跑步', body:'跑一圈', date:"2021: November/20, 09:30"},
];
let show_schedule = ['0','2021','January']

const router = new Router();
router.get('/', list)
    .get('/post/new(.*)', add)
    .get('/post/:id', show)
    .post('/post', create) // 如果有很多字用post，較安全，不會把內容貼到網址上，貼在文內部
    .get('/public/(.*)', async (ctx) => {
        await send(ctx, ctx.params[0], {
            root: Deno.cwd()+"/public", // 放在其他資料夾
            //index: , // 只打資料夾時候
        }) 
    })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
    ctx.response.body = await render.list(posts);
}          

async function add(ctx) {
    ctx.response.body = await render.newPost();
    show_schedule[0] = ctx.params[0]
}

async function show(ctx) {
    const id = ctx.params.id;
    const post = posts[id];
    if (!post) ctx.throw(404, 'invalid post id');
    ctx.response.body = await render.
    show(post);
}

async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") { // 確認是不是用form的方式送出
        const pairs = await body.value // 取得標題(titil)，和內容(body)
        const post = {}
    for (const [key, value] of pairs) {
        if(key == "date") post[key] = show_schedule[1]+
        ": "+show_schedule[2]+"/"+show_schedule[0]+", "+value
        else post[key] = value
    }
    console.log('post=', post)
    // posts.push(post)把post塞到posts裡面
    const id = posts.push(post) - 1; // push函數有回傳值，return 目前是幾筆資料
    post.created_at = new Date(); // 紀錄日期
    post.id = id; // 放入字典裡
    ctx.response.redirect('/'); // 創建完回到根目錄
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
  