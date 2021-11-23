var R = {}

// public 底下的東西都是前端的
// 相當於前端的router
window.onhashchange = async function () {
  var r
  // #後面的東西(包含)     // window.location.ref: 全部的url
  var tokens = window.location.hash.split('/')
  console.log('tokens=', tokens)
  switch (tokens[0]) {
    case '#show':
      r = await window.fetch('/post/' + tokens[1])       
      let post = await r.json()  // 把字串轉成json
      R.show(post)
      break
    case '#new':
      R.new()
      break
    case '#about':
      R.about()
      break
    case '#game':
      R.game()
      break
    default:
      r = await window.fetch('/list')  // json檔
      let posts = await r.json()
      R.list(posts)
      break
  }
}

window.onload = function () {
  // hash(#後面的)有任何改變就會觸發
  window.onhashchange()
}
R.main_layout = function (title, content) {
  document.querySelector('title').innerText = title
  document.querySelector('main').innerHTML = content
}
R.about = function () {
  R.layout("","")
  return R.main_layout("about",`<iframe src="https://stereomp3.github.io/wp109b/homework/MyWeb8.0/MyWeb.html" style= "z-index: 9999;" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)
}
R.game = function (){
  R.layout("","")
  return R.main_layout("game", `<iframe src="https://stereomp3.github.io/WebGame/unity_mid_term%202D%20project/index.html" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)
}



R.layout = function (title, content) {
  document.querySelector('main').innerHTML = `<h1 style="padding-bottom: 20px;">貼文版</h1>`
  document.querySelector('title').innerText = title
  document.querySelector('#content').innerHTML = content
}

R.list = function (posts) {

  let list = []
  for (let post of posts) {
    list.push(`
    <li>
    <pre style = "font-size : 18px">
貼文標題: ${post.title}          

<a id="show${post.id}" href="#show/${post.id}">閱讀貼文</a>
    </pre>
    </li>
    `)
  }
  let content = `
  <p><a id="createPost" href="#new" class = "under_line_text" style = "font-size: 20px;">建立屬於自己的貼文吧!!(  <i class="fa fa-long-arrow-right" aria-hidden="true"></i> Click to Create)</a></p>
  <p>一共有 <strong>${posts.length}</strong> 則貼文 </p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return R.layout('Posts', content)
}

R.new = function () {
  return R.layout('New Post', `
    <h1 class = "under_line_text">New Post</h1>
    <p>建立新貼文</p>
    <form>
        <p><input id="title" type="text" placeholder="Title" name="title"></p>
        <p><textarea id="body" placeholder="Contents" name="body"></textarea></p>
        <p><input id="savePost" type="button" onclick="R.savePost()" value="發布貼文"></p>
    </form>
  `)
}

R.show = function (post) {
  return R.layout("Read post", `
    <h1>${post.title}</h1>
    <hr>
    <p style = "height : 400px">${post.body}</p>
    <hr>
    <i class="fa fa-reply" aria-hidden="true" style = "font-size: 30px; height : 100px" onclick = "window.location.hash = '#list'"> Back to Post</i>
  `)
}

// 在R.new裡面呼叫
R.savePost = async function () {
  let title = document.querySelector('#title').value
  let body = document.querySelector('#body').value
                  // 把東西丟到 /post (東西看不到，要用get才看的到) // 觸發server的create函式
  let r = await window.fetch('/post', {
    // 把json物件轉成字串
    body: JSON.stringify({title: title, body: body}),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 切回主畫面，這邊可以隨便放hash，要讓window.onhashchange 裡面的 switch 呼叫 default，跳回lists
  window.location.hash = '#list'
  return r
}
