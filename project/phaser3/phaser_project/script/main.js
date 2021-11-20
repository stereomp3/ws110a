var SceneManeger = "Start"
function life_span(){
    // 生命週期_初始
    GameScene.init = function() { // constructor
        // 生命週期 init 上，定義變數，這樣就不用寫在 update 裡，並統一接口。
        this.playerSpeed = 1
        this.keyboard = null    
    }
    preload()
    StartGame()  // launch 在 preload.js this.load.on()裡面
    StartGUI()   // launch 在 Scene.js  gameStart()裡面
    create()
    update()
}