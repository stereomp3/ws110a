import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application()

const posts = [
  {id: 0, title: 'aaa', body: 'aaaaa'}, 
  {id: 1, title: 'bbb', body: 'bbbbb'}
]

const router = new Router()

router.get('/list', list)
    .get('/post/:id', show)
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
  ctx.response.body = posts
}

async function show (ctx) {
  const id = ctx.params.id
  const post = posts[id]  // 這裡把陣列裡面的東西對應id取出來
  if (!post) ctx.throw(404, 'invalid post id')
  // 把檔案類型變成json檔
  ctx.response.type = 'application/json'
  ctx.response.body = post
}

async function create (ctx) {
  const body = ctx.request.body(); // content type automatically detected
  console.log('body = ', body)
  if (body.type === "json") {
    // 這裡oak自動將字串轉成json  (json.parse(obj))
    let post = await body.value;
    post.id = posts.length
    posts.push(post)
    
    ctx.response.body = 'success'
    console.log('create:save=>', posts)
  }
}

console.log('Server run at http://127.0.0.1:8666')
await app.listen({ port: 8666 })