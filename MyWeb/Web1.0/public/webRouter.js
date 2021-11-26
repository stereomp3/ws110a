var ISUSER = false // 確認是否有登入
var r
// public 底下的東西都是前端的
// 相當於前端的router
window.onhashchange = async function () {
    var getUser
    // #後面的東西(包含)     // window.location.ref: 全部的url
    var tokens = window.location.hash.split('/')
    console.log('tokens=', tokens)
    switch (tokens[0]) {
        case '#show':
            // 這裡使用fetch的get，先到/post/:id呼叫後端的show，show把文字檔丟到網站上後
            // 再用r.json把字串轉json，最後放到show(post)裡面呈現
            r = await window.fetch('/post/' + tokens[1])
            let post = await r.json()  // 把字串轉成json
            R.show(post)
            break
        case '#login':
            R.loginUi() 
            break
        case '#loginSuccess':
            R.loginSuccess() 
            break
        case '#loginFail':
            R.loginFail() 
            break
        case '#signup':
            R.signupUi()
            break
        case '#new':
            R.new()
            break
        case '#note':
            R.note()
            break
        case '#about':
            R.about()
            break
        case '#game':
            R.game()
            break
        case '#contact':
            R.contact()
            break
        default:
            r = await window.fetch('/list')  // json檔 到/list裡面拿檔案
            getUser = await window.fetch('/user')
            let posts = await r.json()
            getUser.text().then(function(User) {
                console.log("User:" + User); // this will be a string
                if(User != "") ISUSER = true
                R.list(posts, User)
            })
            if(ISUSER) sideNav.login()
            break       
    }
}

window.onload = function () {
    // hash(#後面的)有任何改變就會觸發
    window.onhashchange()
    detecUser()
}

async function detecUser(){
    let user = await window.fetch('/user')
    user.text().then(function(User) {
        if(User != "") {
            ISUSER = true
            sideNav.login()// 如果有使用者就顯示logout
            document.getElementById("userInfo").innerText = "welcome! "+User
        }
    }) 
}

