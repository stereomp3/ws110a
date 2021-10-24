export function layout(title, content = ``, calendar = ``) {
return `
    <html>
    <head>
        <link rel="icon" href="/picture/Calendar.ico">
        <title>${title}</title> 
        <!--在路徑前面加上/代表相對路徑-->
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
                <p id="show_month">NOVEMBER</p>
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
    for (let day = 1; day <= Object.values(calendar_month)[10]; day ++){
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
        <h1 style = "color : rgb(48, 51, 45)">${ post.title } </h1>
        <h3>${ post.date }</h3>
        <p><a href="/post/${post.id}">查看內容</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/delete/${post.id}" onclick="delete_button();">刪除貼文</a></p>
        </li>
        `)
    }
    let content = `
    <h1>行事曆 </h1> 
    <p>(點選右邊的日期可以創建)<p>
    <p style = "color : red">你有<strong>${posts.length}</strong>個行事曆</p>
    <ul id="posts">
        ${list.join('\n')}
    </ul>
    `
    return layout('Posts', content, Calendar())
}
// method 用get去接，參數都是內容
export function newPost() {
    return layout('New Calendar', `
    <div class = "back_ground">
    <br>
    <h1 style = "text-align:center">New Calendar</h1>
    <p style = "text-align:center">創建新的行事曆</p>
    <form action="/post" method="post" style = "text-align:center">  
        <p><input type="text" placeholder="Title" name="title"></p>
        <label for="date_time">預計開始時間</label>
        <input type="time" id="date_time" name="date">
        <p><textarea placeholder="Contents" name="body"></textarea></p>
        <p><input type="submit" value="Create"></p>
    </form>
    <br>
    <div>
    `)
}

export function show(post) {
    return layout(post.title, `
        <h3 style = "text-align:center">${ post.date }</h3>
        <h1 style = "text-align:center">${post.title}</h1>
        <div class = "back_ground">
            <p style = "text-align:center; color : rgb(255, 255, 255);">${post.body}</p>
        </div>
    `)
}

