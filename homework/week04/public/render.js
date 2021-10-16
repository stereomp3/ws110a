export function layout(title, content = ``, calendar = ``) {
return `
    <html>
    <head>
        <title>${title}</title> 
        <link rel="stylesheet" href="/public/layout.css">
    </head>
    <body>
        <div id="content">
        ${content}
        </div>
        <div id="calendar">
        ${calendar}
        </div>
        <script src="/public/render.js"></script>
        <script src="/public/tool.js"></script>
    </body>
    </html>
    `
}
const calendar_month = {January:'31', February:'28', March:'31',April:'30', May:'31', June:'30', July:'31', August:'31', September:'30', October:'31', November:'30', December:'31'}
const calendar_day = [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
function Calendar(){
    let calendar_list = [`
    <div class="month">  
        <ul>
            <li class="prev"><a onclick ="dec(); Calendar_day();">&#10094;</a></li>
            <li class="next"><a onclick ="inc(); Calendar_day();">&#10095;</a></li>
            <li>
                <p id="show_month">January</p>
                <span style="font-size:18px" id="show_year">2021</span>
            </li>
        </ul>
    </div>
    `]
    calendar_list.push(`<ul id = "weekdays">`)
    for (let weekday = 0; weekday < calendar_day.length; weekday ++){
        calendar_list.push(`<li>${calendar_day[weekday]}</li>`)
    }
    calendar_list.push(`</ul> <ul id = "days">`)
    for (let day = 1; day <= Object.values(calendar_month)[0]; day ++){
        calendar_list.push(`<li><a href = /post/new${day}>${day}</a></li>`)
    }
    calendar_list.push(`</ul>`)
    return calendar_list.join(" ")
}

export function list(posts) {
    let list = []
    for (let post of posts) {
        list.push(`
        <li>
        <h2>${ post.title }，預定時間${ post.date }</h2>
        <p><a href="/post/${post.id}">Read post</a></p>
        </li>
        `)
    }
    let content = `
    <h1>Posts</h1>
    <p>You have <strong>${posts.length}</strong> posts!</p>
    <ul id="posts">
        ${list.join('\n')}
    </ul>
    `
    return layout('Posts', content, Calendar())
}
// method 用get去接，參數都是內容
export function newPost() {
    return layout('New Post', `
    <h1>New Post</h1>
    <p>Create a new post.</p>
    <form action="/post" method="post"> 
        <p><input type="text" placeholder="Title" name="title"></p>
        <p><input type="time" placeholder="預定行程時間" name="date"></p>
        <p><textarea placeholder="Contents" name="body"></textarea></p>
        <p><input type="submit" value="Create"></p>
    </form>
    `)
}

export function show(post) {
    return layout(post.title, `
        <h3 style = "text-align:center">預定時間${ post.date }</h3>
        <h1 style = "text-align:center">${post.title}</h1>
        <p style = "text-align:center">${post.body}</p>
    `)
}

