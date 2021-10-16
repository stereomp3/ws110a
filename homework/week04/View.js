import {LogicManeger} from './Controller.js'
import {LayoutModel} from './Model.js'

export class ViewManeger{
    constructor(){
        this.logic = new LogicManeger()
        this.layout = new LayoutModel()
        console.log('this.layout=', this.layout)
    } 
    // obj.func, 不能直接被 oak router 呼叫。必須包成 (ctx)=>obj.func(ctx)
    list(ctx){
        console.log('this.layout=', layout)
            ctx.response.body = 'hello' // await this.layout.use('Posts', ``);
    }
    show(){
        async (ctx) => {
            const id = ctx.params.id;
            const post = posts[id];
            if (!post) ctx.throw(404, 'invalid post id');
            ctx.response.body = await layout.use(logic.posts.title, this.logic.show(post));
        }
    }
    add(){
        async (ctx) => {
            ctx.response.body = await layout.use('New Post',logic.newPost());
        }
    }  
}
