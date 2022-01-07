let fps, fpsInterval, startTime, timestamp = Date.now(), preTimestamp, progress, keystate = [];;
let player = -99

function MainGame() {
    startAnimating(10) // 調整fps
    //console.log(init_map(map))
    // 監聽按鍵輸入
    input_detect()
    random_item(25) // 1/25
    var loop = function () {
        timestamp = Date.now(); //調整速率
        progress = timestamp - preTimestamp;
        if (progress > fpsInterval) { 
            console.log("in")
            startAnimating(10); 
            controller(map)
            draw(map)

        }
        window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
}
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    preTimestamp = Date.now();
    startTime = preTimestamp;
}

function draw(map) {
    document.getElementById("game").innerHTML = print_map(init_map(map))
    document.getElementById("small_map").innerHTML = `<br> 小地圖 <br><br>`+print_small_map()
    //socket.send(JSON.stringify(print_map(init_map(map))))
    //socket.send(JSON.stringify(print_map(init_map(`<br> 小地圖 <br><br>`+print_small_map()))))
}
function init_map(map){
    let record_map = []
    for(let x = min_x; x < max_x; x++){
        record_map.push([])
        for(let y = min_y; y < max_y; y++){
            console.log("y: "+y+", x: "+x)
            // item
            if(Math.abs(map[x][y]) == 2) record_map[x-min_x].push(`箱`)  
            // block
            if(Math.abs(map[x][y]) == 4) record_map[x-min_x].push(`上`) 
            if(Math.abs(map[x][y]) == 5) record_map[x-min_x].push(`下`) 
            if(Math.abs(map[x][y]) == 6) record_map[x-min_x].push(`左`) 
            if(Math.abs(map[x][y]) == 7) record_map[x-min_x].push(`右`) 
            if(Math.abs(map[x][y]) == 3) record_map[x-min_x].push(`樹`)  
            if(Math.abs(map[x][y]) == 1) record_map[x-min_x].push(`牆`)  
            
            if(map[x][y] == 0) record_map[x-min_x].push(`<a style="visibility: hidden; color: #00ADB5">路</a>`)  // road
            if(map[x][y] == -99) record_map[x-min_x].push("人")  // road
        }
    }
    return record_map
}

function print_map(map){
    let P_map, temp = []
    for(let x = 0; x < map.length; x++){
        temp.push(map[x].join(""))
    }
    P_map = temp.join("<br>")
    return P_map
}
function print_small_map(){
    let s_map = [[0,0,0],[0,0,0],[0,0,0],], temp = [], P_map
    for(let x = 0; x < 3; x++){
        for(let y = 0; y < 3; y++){
            s_map[x][y] = "無"
            if(x == min_x/15 && y == min_y/15) s_map[x][y] = "人"
        } 
        temp.push(s_map[x].join(""))
    }
    P_map = temp.join("<br>")
    return P_map
}

function input_detect(){
    document.addEventListener("keydown", function (event) {//這裡的evt是接收玩家的鍵盤事件
        keystate[event.code] = true//鍵盤按下
    }, true);
    document.addEventListener("keyup", function (event) {
        keystate[event.code] = false;//放開取消事件，避免短期按太多按件
    }, true);
}

function random_item(max){
    for(let x = 1; x < map.length-1; x++){
        for(let y = 1; y < map.length-1; y++){
            if(Math.floor(Math.random() * max)==0) map[x][y] = 2
        }
    } 
}