
// 創建場景
let scene = new Phaser.Scene('Game')

// 基本配置
let config = {
    type: Phaser.AUTO,	// 會使用 WebGL 或 Canvas API，AUTO 是讓 Phaser 決定
    width: 640,
    height: 320,
    scene			// 等同於 scene: scene
}

// 創建遊戲
let game = new Phaser.Game(config)
life_span()

function life_span(){
    // 生命週期_初始
    scene.init = function() { // constructor
        // 生命週期 init 上，定義變數，這樣就不用寫在 update 裡，並統一接口。
        this.playerSpeed = 1
        this.keyboard = null
    } 

    // 生命週期_加載素材
    scene.preload = function() {
        this.load.image('bg', 'assets/bg.png')  		//「bg」當作一個標籤
        this.load.image('player', 'assets/player.png')  //「player」當作一個標籤
        this.load.image('player02', 'assets/player02.png')
    }

    scene.create = function(){
        this.keyboard = this.input.keyboard.createCursorKeys() // 取得鍵盤輸入

        this.bg = this.add.sprite(0, 0, 'bg')
        this.player = this.add.sprite(0, 0, 'player')
        this.player02 = this.add.sprite(600, 223, 'player02')
        this.player.depth = 1	// 預設 depth(z-index) 為 0，這裡設定 1
        // 方法 1 ) 把圖片的中心點設為 (0,0) 左上角
        this.bg.setOrigin(0,0)

        // 方法 2 ) 抓取原本設定的 config
        let width = this.sys.game.config.width	// 取得 config 的 width : 640
        let height = this.sys.game.config.height// 取得 config 的 width : 320
        this.player.setPosition(width / 2, height / 2)	// 也就是 this.add.sprite(320, 160, 'player')

        
        this.player.setScale(1.5, 1.5) // 1.5倍大小的圖片物件，可以省略成 setScale(1.5)
        	
        // 直接設定寬度，可以讓背景對齊遊戲視窗		
        this.bg.displayWidth = width
        this.bg.displayHeight = height

        this.bg.setFlip(true, true) // 翻轉
        
    }

    scene.update = function(){
        console.log('update')
        // 讓人物旋轉
        // this.player.angle += 0.5

        if (this.keyboard.right.isDown) {
            this.player.x += this.playerSpeed
        }
        if (this.keyboard.left.isDown) {
            this.player.x -= this.playerSpeed
        }
    }
}
