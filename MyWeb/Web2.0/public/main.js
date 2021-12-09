var R = {}

R.main_layout = function (title, content) {
  document.querySelector('title').innerText = title
  document.querySelector('main').innerHTML = content
  document.getElementById("tyInfo").style.display = "none"
}
R.note = function(){
  R.layout("","")
  return R.main_layout("note",`<iframe src="https://stereomp3.github.io/note/" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)
}
R.about = function () {
  R.layout("","")
  return R.main_layout("about",`<iframe src="https://stereomp3.github.io/wp109b/homework/MyWeb8.0/MyWeb.html" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)
}
R.game = function (){
  R.layout("","")
  return R.main_layout("game", `<iframe src="https://stereomp3.github.io/WebGame/unity_mid_term%202D%20project/index.html" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)
}
R.contact = function(){
  if(document.getElementsByClassName("minicanvas")[0]==undefined){  // 只能觸發一次，最多顯示一個區域
    var newDiv = document.createElement("div"); // 新增節點
    newDiv.className = "minicanvas" // 添加class name
    document.body.appendChild(newDiv)
    document.getElementsByClassName("minicanvas")[0].innerHTML = `
    <i class="fa fa-times" aria-hidden="true" style = "float: right; padding: 10px; color: #EEEEEE" onclick="button.close();"></i>
    <div style = "margin-top: 10%;">
      <a href="https://www.facebook.com/ericjjkk" class = "MyInfo" target=_blank;><i class="fa fa-facebook-square" aria-hidden="true"></i></a>   
      <a href="https://github.com/stereomp3" class = "MyInfo" target=_blank;><i class="fa fa-github" aria-hidden="true"></i></a>   
      <a href="https://store.steampowered.com/" class = "MyInfo" target=_blank;><i class="fa fa-steam" aria-hidden="true"></i></a>   
      <a href="https://www.youtube.com/" class = "MyInfo" target=_blank;><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
    </div>`
  }
}
R.experimental = function(){
  R.layout("","")
  return R.main_layout("experimental",`<iframe src="https://stereomp3.github.io/experimental/index.html" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`)
}



R.layout = function (title, content) {
  document.querySelector('main').innerHTML = ``
  document.querySelector('title').innerText = title
  document.querySelector('#content').innerHTML = content
  document.getElementById("tyInfo").style.display = ""
}

R.list = function (posts, user) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
    <div class = "PostDiv">
    <pre style = "font-size : 18px">
   貼文標題: ${post.title}      poster: ${post.username}    

<a style = "color: #00ADB5" id="show${post.id}" href="#show/${post.id}">閱讀貼文</a>
    </pre>
    </div>
    
    </li>
    `)
  }
  let content = `
  <h1 style="padding-bottom: 20px;">貼文版</h1>
  <p>${(user=="")?'<a class = "under_line_text" style = "font-size: 20px;">要登入才可以發文呦</a>'
  :'<a id="createPost" href="#new" class = "under_line_text" style = "font-size: 20px;">建立屬於自己的貼文吧!!(  <i class="fa fa-long-arrow-right" aria-hidden="true"></i> Click to Create)</a>'}</p>
  <p>一共有 <strong>${posts.length}</strong> 則貼文 </p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return R.layout('Posts', content)
}

// 讀取網站資料
R.show = function (post) {
  return R.layout("Read post", `
    <h1 style="padding-bottom: 20px;">貼文版</h1>
    <h1>${post.title}</h1>
    <hr>
    <p style = "height : 400px">${post.body}</p>
    <hr>
    <i class="fa fa-reply" aria-hidden="true" style = "font-size: 30px; height : 100px" onclick = "window.location.hash = '#list'"> Back to Post</i>
  `)
}

R.new = function () {
  return R.layout('New Post', `
    <h1 style="padding-bottom: 20px;">貼文版</h1>
    <h1 class = "under_line_text">New Post</h1>
    <p>建立新貼文</p>
    <form>
        <p><input id="title" type="text" placeholder="Title" name="title"></p>
        <p><textarea id="body" placeholder="Contents" name="body"></textarea></p>
        <p><input id="savePost" type="button" onclick="R.savePost()" value="發布貼文"></p>
    </form>
  `)
}

R.loginUi = function (){
  return R.layout('Login', `
  <div class = "midcanvas">
    <h1 style = "margin-top: 10%;">Login</h1>
    <form style = "margin-top: 5%;">
      <p><input id="username" type="text" placeholder="username" name="username"></p>
      <p><input id="password" type="password" placeholder="password" name="password"></p>
      <p><input id="login" type="button" onclick="R.login()" value="Login"></p>
      <p><i class="fa fa-long-arrow-right" aria-hidden="true"></i> <a href="#signup" style = "color: rgb(0, 0, 0);"> Signup </p>
    </form>
  </div>
  `)
}
R.signupUi = function (){
  return R.layout('Signup', `
  <div class = "midcanvas">
    <h1 style = "margin-top: 10%;">Signup</h1>
    <form style = "margin-top: 5%;">
      <p><input id="username" type="text" placeholder="username" name="username"></p>
      <p><input id="password" type="password" placeholder="password" name="password"></p>
      <p><input id="email" type="text" placeholder="email" name="email"></p>
      <p><input id="signup" type="button" onclick="R.signup()" value="Signup"></p>
    </form>
  </div>
  `)
}

R.loginSuccess = function (){
  return R.layout('loginSuccess', `
  <div class = "midcanvas">
    <h1 style = "margin-top: 10%;">loginSuccess</h1>
    <a href = "#list">回到貼文區</a>
  </div>
  `)
}

R.loginFail = function (){
  return R.layout('loginFail', `
  <div class = "midcanvas">
    <h1 style = "margin-top: 10%;">loginFail</h1>
    <p>還沒註冊嗎?<i class="fa fa-long-arrow-right" aria-hidden="true"></i><a href = "#signup">Signup</a></p>
  </div>
  `)
}