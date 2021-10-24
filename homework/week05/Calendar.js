import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './public/render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db"); // 創建資料庫
db.query("CREATE TABLE IF NOT EXISTS Calendar (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, date TEXT)");

let show_schedule = ['0','2021','NOVEMBER']

const router = new Router();
router.get('/', list) // 當有東西尋徑時就會觸發
    .get('/post/new(.*)', add)
    .get('/delete/:id', delete_list)
    .get('/post/:id', show)  // id是變量，可以曾測數字
    .post('/post', create) // 如果有很多字用post，較安全，不會把內容貼到網址上，貼在文內部
    .get('/public/(.*)', async (ctx) => {
        await send(ctx, ctx.params[0], {
            root: Deno.cwd()+"/public", // 放在其他資料夾
            //index: , // 只打資料夾時候
        }) 
    })
    .get('/picture/(.*)', async (ctx) => {
        await send(ctx, ctx.params[0], {
            root: Deno.cwd()+"/picture", // 放在其他資料夾
            //index: , // 只打資料夾時候
        }) 
    })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) { // 把列表轉為矩陣([[]] --> [{}])
    let list = []
    for (const [id, title, body, date] of db.query(sql)) {
      list.push({id, title, body, date})
    }
    return list
}

async function list(ctx) {
    // 把列表轉為矩陣([[]] --> [{}])
    let calendar = query("SELECT id, title, body, date FROM Calendar")
    console.log('list:calendar=', calendar)
    ctx.response.body = await render.list(calendar);
}          
function delete_list(ctx){
    const id = ctx.params.id;
    db.query(`DELETE FROM Calendar WHERE id=${id}`)
    ctx.response.redirect('/');
}
async function add(ctx) {
    ctx.response.body = await render.newPost();
    show_schedule[0] = ctx.params[0]
}

async function show(ctx) {
    const id = ctx.params.id;
    let calendars = query(`SELECT id, title, body, date FROM Calendar WHERE id=${id}`)
    let calendar = calendars[0];
    if (!calendar) ctx.throw(404, 'invalid post id');
    ctx.response.body = await render.show(calendar);
}

async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") { // 確認是不是用form的方式送出
        const pairs = await body.value // 取得標題(titil)，和內容(body)
        const calendar = {}
    for (const [key, value] of pairs) {
        if(key == "date") calendar[key] = show_schedule[1]+"/"+show_schedule[2]+"/"+show_schedule[0]+`<br>`+"預定時間"+value
        else if(key == "body") calendar[key] = value + `<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>`
        else calendar[key] = value
    }
    console.log('calendar=', calendar)
    // 把title, body, date 的數據塞到Calendar列表裡面的字典
    db.query("INSERT INTO Calendar (title, body, date) VALUES (?, ?, ?)", [calendar.title, calendar.body, calendar.date])
    ctx.response.redirect('/'); // 創建完回到根目錄
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
  