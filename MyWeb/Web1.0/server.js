import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";

const db = new DB("data.db"); // 創建資料庫
db.query("CREATE TABLE IF NOT EXISTS Posts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, title TEXT, body TEXT)")
db.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)")

const app = new Application()


const session = new Session();
const router = new Router()

router.get('/list', list)
      .get('/post/:id', show) // id從0開始
      .post('/signup', session.initMiddleware(), signup)
      .post('/login', session.initMiddleware(), login)
      .post('/post', create)
      .get("/(.*)", async (ctx) => { //get("/", func())根目錄顯示
      await send(ctx, ctx.params[0],{
          // 把資料夾(/public)的檔案傳到網站上(這裡是到網站的根目錄底下)
          root: Deno.cwd() + "/public", 
          index: "index.html"
          })
      })

app.use(router.routes())
app.use(router.allowedMethods())

// 把路徑上的東西傳回到網上
app.use(async (next) => {
  // 因為可以掛很多middleWare，所以需要這個，讓所有middleWare都執行
  await next()
})

async function list (ctx) {
  // 傳回的是json檔
  ctx.response.type = 'application/json'
  // 把資料放到/list裡面
  ctx.response.body = postQuery("SELECT id, username, title, body FROM Posts")
}

// 把內容用成字串放到網路上(/post/id)
async function show (ctx) {
  const id = ctx.params.id
  console.log("id:"+id)
  let posts = postQuery(`SELECT id, username, title, body FROM Posts WHERE id=${id}`)  // 這裡把陣列裡面的東西對應id取出來
  let post = posts[0]  // 出來的型態是[[]]，所以要選第一個，直接送posts會讓main的show找不到title, id ...
  if (!post) ctx.throw(404, 'invalid post id')
  // 把檔案類型變成json檔(原本是字串)
  ctx.response.type = 'application/json'
  ctx.response.body = post
}

async function create (ctx) {
  // 接收前端fetch的資料 /post
  const body = ctx.request.body(); // content type automatically detected
  console.log('body = ', body)
  if (body.type === "json") {
    // 這裡oak自動將字串轉成json  (json.parse(obj))
    let post = await body.value;
    // 創建時把資料丟到資料庫
    sqlcmd("INSERT INTO posts (title, body) VALUES (?, ?)", [post.title, post.body])
    ctx.response.body = 'success' // 這句一定要有，不然網站沒有內容會報錯!!!!
    console.log('create:save=>', post)
  }
}

async function signup(ctx) {
  // 接收前端fetch的資料 /signup
  const body = ctx.request.body(); // content type automatically detected
  if (body.type === "json") {
    let user = await body.value;
    var dbUsers = userQuery(`SELECT id, username, password, email FROM users WHERE username='${user.username}'`)
    if (dbUsers.length === 0) {
      // 添加資料
      sqlcmd("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [user.username, user.password, user.email])
      console.log("USER:" + userQuery("SELECT id, username, password, email FROM users"))
      ctx.response.body = 'success' // 這句一定要有，不然網站沒有內容會報錯!!!!
      console.log('create:save=>', user)
      console.log("$ signup success")
    }
    else {
      console.log("$ signup fail")
      ctx.response.body = 'fail' // 這句一定要有，不然網站沒有內容會報錯!!!!
    }
    
  }
}
async function login(ctx) {
  // 接收前端fetch的資料 /login
  const body = ctx.request.body(); // content type automatically detected
  console.log('body = ', body)
  if (body.type === "json") {
    // 這裡oak自動將字串轉成json  (json.parse(obj))
    let user = await body.value;
    console.log("USER:" + userQuery("SELECT id, username, password, email FROM users"))
    var dbUsers = userQuery(`SELECT id, username, password, email FROM users WHERE username='${user.username}'`) // userMap[user.username]
    var dbUser = dbUsers[0]

    // 沒有這個使用者直接跳開
    if(!dbUser) return ctx.response.redirect('/')

    if(dbUser.password === user.password){
      console.log("$ login success")
      ctx.response.body = 'success' // 這句一定要有，不然網站沒有內容會報錯!!!!
      // 登入綁定使用者
      ctx.state.session.set('username', user.username)
      console.log('session.user=', await ctx.state.session.get('username'))
    }
    else{
      console.log("$ login fail")
      ctx.response.body = 'fail' // 這句一定要有，不然網站沒有內容會報錯!!!!
    }
    
    ctx.response.body = 'success' // 這句一定要有，不然網站沒有內容會報錯!!!!
  }
}

// 防報錯出問題
function sqlcmd(sql, arg1) {
  console.log('sql:', sql)
  try {
    var results = db.query(sql, arg1)
    console.log('sqlcmd: results=', results)
    return results
  } catch (error) {
    console.log('sqlcmd error: ', error)
    throw error
  }
}

// 把列表轉成字典
function postQuery(sql) {
  let list = []
  for (const [id, username, title, body] of sqlcmd(sql)) {
    list.push({id, username, title, body})
  }
  console.log('postQuery: list=', list)
  return list
}

// 把列表轉成字典
function userQuery(sql) {
  let list = []
  for (const [id, username, password, email] of sqlcmd(sql)) {
    list.push({id, username, password, email})
  }
  console.log('userQuery: list=', list)
  return list
}


console.log('Server run at http://127.0.0.1:1998')
await app.listen({ port: 1998})