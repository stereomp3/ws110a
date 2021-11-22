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

R.layout = function (title, content) {
  document.querySelector('title').innerText = title
  document.querySelector('#content').innerHTML = content
}

R.list = function (posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a id="show${post.id}" href="#show/${post.id}">Read post</a></p>
    </li>
    `)
  }
  let content = `
  <h1>Posts</h1>
  <p>You have <strong>${posts.length}</strong> posts!</p>
  <p><a id="createPost" href="#new">Create a Post</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return R.layout('Posts', content)
}

R.new = function () {
  return R.layout('New Post', `
  <h1>New Post</h1>
  <p>Create a new post.</p>
  <form>
    <p><input id="title" type="text" placeholder="Title" name="title"></p>
    <p><textarea id="body" placeholder="Contents" name="body"></textarea></p>
    <p><input id="savePost" type="button" onclick="R.savePost()" value="Create"></p>
  </form>
  `)
}

R.show = function (post) {
  return R.layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <i class="fa fa-reply" aria-hidden="true" style = "font-size: 30px" onclick = "window.location.hash = '#list'"> Back to Menu</i>
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
