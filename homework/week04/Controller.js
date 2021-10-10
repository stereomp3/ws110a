import {CalendarModel, LayoutModel} from './Model.js'

export class LogicManeger{
    constructor(){
        this.layout = new LayoutModel()
        this.posts = [
            new CalendarModel('期中考', '考試，作專題，報告', "2021: 11/8~11/13", 0),
            new CalendarModel('期末考', '考試，作專題，報告', "2022: 01/10~01/15", 0),
        ];
    }   
    get get_posts(){
        return this.posts
    }
    push_list() {
        let list = []
        for (let post of this.post) {
            list.push(`
            <li>
            <h2>${ post.title }，預定時間${ post.date }</h2>
            <p><a href="/post/${post.id}">Read post</a></p>
            </li>
            `)
        }
        return list   
    }

    list_content(list){
        let content = `
        <h1>Posts</h1>
        <p>You have <strong>${posts.length}</strong> posts!</p>
        <p><a href="/post/new">Create a Post</a></p>
        <ul id="posts">
            ${list.join('\n')}
        </ul>
        `
        return content
    }

    show() {
        return `
            <h3 style = "text-align:center">預定時間${ post.date }</h3>
            <h1 style = "text-align:center">${post.title}</h1>
            <p style = "text-align:center">${post.body}</p>
        `
    }
    create() {
        async (ctx) => {
            const body = ctx.request.body()
            if (body.type === "form") { // 確認是不是用form的方式送出
                const pairs = await body.value // 取得標題(titil)，和內容(body)
                const post = {}
            for (const [key, value] of pairs) {
                post[key] = value
            }
            output = new CalendarModel(post[title],post[body] , post[date], post[id])
            // posts.push(post)把post塞到posts裡面
            const id = this.posts.push(output) - 1; // push函數有回傳值，return 目前是幾筆資料
            post.id = id; // 放入字典裡
            ctx.response.redirect('/');
            }
        }
    }

    newPost() {
        return `
        <h1>New Post</h1>
        <p>Create a new post.</p>
        <form action="/post" method="post"> 
            <p><input type="text" placeholder="Title" name="title"></p>
            <p><input type="text" placeholder="預定行程時間" name="date"></p>
            <p><textarea placeholder="Contents" name="body"></textarea></p>
            <p><input type="submit" value="Create"></p>
        </form>
        `
    }
}
// return layout('Posts', content)