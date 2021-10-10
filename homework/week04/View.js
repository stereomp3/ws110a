import {LogicManeger} from './Controller.js'
import {LayoutModel} from './Model.js'

export class VeiwManeger{
    constructor(){
        this.logic = new LogicManeger()
        this.layout = new LayoutModel()
    } 

    list(){
        async (ctx) => {
            ctx.response.body = await layout.use('Posts', this.logic.push_list(this.logic.push_list));
        } 
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
