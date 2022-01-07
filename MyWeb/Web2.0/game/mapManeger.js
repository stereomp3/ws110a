class Vector2{
    constructor(x = 0, y = 0){
        this.x = x
        this.y = y
    }

    move(vect_dir){
        this.x += vect_dir.x
        this.y += vect_dir.y
    }

    // static method
    static get_left(){
        return new Vector2(0, -1)
    }
    static get_right(){
        return new Vector2(0, 1)
    }
    static get_down(){
        return new Vector2(1, 0)
    }
    static get_up(){
        return new Vector2(-1, 0)
    }
    static stay(){
        return new Vector2(0, 0)
    }
}

class DoubleListHelper{
    static get_elements(list_target, vect_pos, vect_dir, count = 1){
        let list_result = []
        let dst_x = vect_pos.x, dst_y = vect_pos.y // 不改vect_pos位置，這裡用來定位
        for(let __ = 0; __ < count; __++){
            dst_x += vect_dir.x
            dst_y += vect_dir.y
            let element = list_target[dst_x][dst_y]
            list_result.push(element)
        }
        return list_result
    }

    static set_elements(list_target, vect_pos, vect_dir, element, count = 1){
        let dst_x = vect_pos.x, dst_y = vect_pos.y
        for(let __ = 0; __ < count; __++){
            dst_x += vect_dir.x
            dst_y += vect_dir.y
        }
        list_target[dst_x][dst_y] = element
    }
}

let position = set_postion(map, player)

function controller(map){
    if (keystate["KeyW"]) {
        //console.log(DoubleListHelper.get_elements(map, position, Vector2.get_up()))
        movement(map, Vector2.get_up(), player)    
    }
    if (keystate["KeyA"]) {
        //console.log(DoubleListHelper.get_elements(map, position, Vector2.get_left(),3)[2])
        movement(map, Vector2.get_left(), player)
    }
    if (keystate["KeyS"]) {
        movement(map, Vector2.get_down(), player)
    }
    if (keystate["KeyD"]) {
        //console.log(DoubleListHelper.get_elements(map, position, Vector2.get_right()))
        movement(map, Vector2.get_right(), player)
    }
    if (keystate["KeyJ"]) {
        player = change(player)
    }
    if (keystate["KeyK"]) {
        player = -99
        DoubleListHelper.set_elements(map, position, Vector2.stay(), player)
    }
    switch_map()
}


function set_postion(map, player){
    let pos
    for(let x = 0; x < map.length; x++){
        for(let y = 0; y < map[x].length; y++){
            if(map[x][y]==player) pos = new Vector2(x, y)
        }
    }
    return pos
}



function move(map, vect_dir, player){
    DoubleListHelper.set_elements(map, position, Vector2.stay(), 0) // 原地設成0
    DoubleListHelper.set_elements(map, position, vect_dir, player)
    position.move(vect_dir)
}

function push(map, vect_dir, item){
    let p = item_pos(vect_dir)
    DoubleListHelper.set_elements(map, p, Vector2.stay(), 0)
    DoubleListHelper.set_elements(map, p, vect_dir, item)
}
function movement(map, vect_dir, player){
    if(DoubleListHelper.get_elements(map, position, vect_dir)==2 && DoubleListHelper.get_elements(map, item_pos(vect_dir), vect_dir)==0){
        push(map, vect_dir, 2)
    }
    if(DoubleListHelper.get_elements(map, position, vect_dir)==0) move(map, vect_dir, player)
}
function switch_map(){
    if(position.x >= max_x){
        min_x = max_x
        max_x += 15
    }
    if(position.y >= max_y){
        min_y = max_y
        max_y += 15
    }
    if(position.x < min_x){
        max_x = min_x
        min_x -= 15
    }
    if(position.y < min_y){
        max_y = min_y
        min_y -= 15
    }
}

function create_player(pos){
    console.log(pos)
    DoubleListHelper.set_elements(map[matrix_x][matrix_y], pos, Vector2.stay(), player) // 把玩家放到map裡面
    position = set_postion(map[matrix_x][matrix_y], player)  // 設定位置
    console.log(position)
}

function item_pos(vect_dir){
    let p = new Vector2(position.x + vect_dir.x, position.y + vect_dir.y)
    return p 
}

function change(p){
    if(DoubleListHelper.get_elements(map, position, Vector2.get_left())!=0) p = DoubleListHelper.get_elements(map, position, Vector2.get_left())
    if(DoubleListHelper.get_elements(map, position, Vector2.get_right())!=0) p = DoubleListHelper.get_elements(map, position, Vector2.get_right())
    if(DoubleListHelper.get_elements(map, position, Vector2.get_up())!=0) p = DoubleListHelper.get_elements(map, position, Vector2.get_up())
    if(DoubleListHelper.get_elements(map, position, Vector2.get_down())!=0) p = DoubleListHelper.get_elements(map, position, Vector2.get_down())
    DoubleListHelper.set_elements(map, position, Vector2.stay(), p)
    return p
}


