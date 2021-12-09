// 資料傳輸(傳到後端)
// 在R.new裡面呼叫
R.savePost = async function () {
// 取出form裡面id欄位的資料
    let title = document.querySelector('#title').value
    let body = document.querySelector('#body').value
                    // 把東西丟到 /post (東西看不到，要用get才看的到//這個在後端) // 觸發server的create函式
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

// 在R.loginUi裡面呼叫
R.login = async function(){
    // 取出form裡面id欄位的資料
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    let r = await window.fetch('/login', { // window是預設，可以省略
        // 把json物件轉成字串
        body: JSON.stringify({username: username, password: password}),
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    r.text().then(function(data) {
        console.log("body text:" + data); // this will be a string
        if(data=="success") {
            window.location.hash = '#loginSuccess'
            detecUser()
        }
        else window.location.hash = '#loginFail'
    })
    return r
}

// 在R.loginUi裡面呼叫
R.signup = async function(){
    // 取出form裡面id欄位的資料
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    let email = document.querySelector('#email').value
    let r = await window.fetch('/signup', { 
        // 把json物件轉成字串
        body: JSON.stringify({username: username, password: password, email: email}),
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    r.text().then(function(data) {
        console.log("body text:" + data); // this will be a string
        if(data=="success") {
            window.location.hash = '#login'
        }
        else if(data=="usernamefail") alert("username cannot be null.")
        else if(data=="passwordfail") alert("password is to short...\npassword must be at least 6 characters.")
        else if(data=="emailfail") alert("email format error..")
        else alert("username already exists!")
    })
    return r
}