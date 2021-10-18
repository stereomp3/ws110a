> 自學網頁遊戲開發，參考網頁:  [Phaser 幫我撐個 30 天](https://ithelp.ithome.com.tw/users/20111617/ironman/1794)、[Note of Phaser3](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/)

# Phaser遊戲製作

* 引入script `<script src=“//cdn.jsdelivr.net/npm/phaser@3.14.0/dist/phaser.min.js"></script>`

  

>[建創遊戲視窗](#建創遊戲視窗)



>[加入遊戲素材](#加入遊戲素材)



>[素材變形](#素材變形)



> [使用者互動](#使用者互動)



### 建創遊戲視窗

```js
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
```



### 加入遊戲素材

> 遊戲整體架構

```js
function life_span(){
    // 生命週期_初始
    scene.init = function() {  // constructor
        // 生命週期 init 上，定義變數，這樣就不用寫在 update 裡，並統一接口。
        this.playerSpeed = 1
        this.keyboard = null
    } 

    // 生命週期_加載素材
    scene.preload = function() {
        this.load.image('bg', 'assets/bg.png')  		//「bg」當作一個標籤
        this.load.image('player', 'assets/player.png')  //「player」當作一個標籤
    }
    
    scene.create = function(){
        // let bg = this.add.sprite(0, 0, 'bg')
        // let player = this.add.sprite(0, 0, 'player')
        this.bg = this.add.sprite(0, 0, 'bg')
        this.player = this.add.sprite(0, 0, 'player') // 使用this是讓其他函數可以對create裡面的變數進行操作(因為他已經變成scene.play了)
        this.player.depth = 1	// 預設 depth(z-index) 為 0，這裡設定 1
        
        // 方法 1 ) 把圖片的中心點設為 (0,0) 左上角
        this.bg.setOrigin(0,0)

        // 方法 2 ) 抓取原本設定的 config
        let width = this.sys.game.config.width	// 取得 config 的 width : 640
        let height = this.sys.game.config.height// 取得 config 的 width : 320
        this.player.setPosition(width / 2, height / 2)	// 也就是 this.add.sprite(320, 160, 'player')
        
    }

    scene.update = function(){
        console.log('update')
    }
}
```



### 素材變形

> 可以放在scene.create裡面，在創建時就決定好大小

```js
scene.create = function(){
    //前面內容....
// 調整大小，像CSS的 transform: sacle(x, y)。
    // 方法 1 )  兩倍大小的圖片物件，可以省略成 setScale(2)
    this.player.setScale(2, 2)

    // 方法 2 ) 針對xy設定大小
    this.bg.scaleX = 0.5
    this.bg.scaleY = 0.5 	

    // 方法 3 ) 直接設定寬度，可以讓背景對齊遊戲視窗		
    this.bg.displayWidth = width
    this.bg.displayHeight = height
        
// 圖片左右是否翻轉，像cs的 rotateX(180deg)、rotateY(180deg)     
    // 方法 1 )  用 setFlip 來設定 X 和 Y 翻轉
    this.player.setFlip(true, true)

    // 方法 2 ) 直接用 flipX 和 flipY 來更改
    this.bg.flipX = true
    this.bg.flipY = true

// 圖片角度翻轉
    // 方法 1 )旋轉角度的設定，使用「角度」，等同 player.angle = 45
    this.player.setAngle(45)

    // 方法 2 ) 旋轉角度的設定，使用「弧度」，等同 player.rotation = Math.PI / 4
    this.player.setRotation(Math.PI / 4)
    
// 可以使用多種方法在同一物件上
    // 旋轉90度然後縮小0.3倍
    this.player.setAngle(-90).setScale(0.3) 
}


// 可以在update裡面加上角度，可以讓角色轉起來
scene.update = function() {
    //前面內容....
    this.player.angle += 0.5
}


// !! 如果上面沒有用 this.bg(let bg)就不用加this直接用bg就好
```



### 使用者互動

>keyboard event、click event

```JS
// click event
scene.update = function() {
    //前面內容....
    // 當使用者點擊在畫面上（手機也適用）
    if (this.input.activePointer.isDown) {		
        this.player.x += this.playerSpeed
    }
}

// Keyboard events
scene.create = function(){
    //....
    this.keyboard = this.input.keyboard.createCursorKeys() // 取得鍵盤輸入
}
scene.update = function() {
    //....
    // 使用上面create的 this.keyboard
    // 上(up)、下(down)、左(left)、右(right)、空白(space)、shift(shift)
    if (this.keyboard.right.isDown) {
            this.player.x += this.playerSpeed
    }
    if (this.keyboard.left.isDown) {
            this.player.x -= this.playerSpeed
    }
    
    // 使用字母鍵
    // Get key object
    var keyD = scene.input.keyboard.addKey('D')
    var keyA = scene.input.keyboard.addKey('A')
    if(keyD.isDown){
        this.player.x += this.playerSpeed
    }
    if(keyA.isDown){
        this.player.x -= this.playerSpeed
    }
}
```

