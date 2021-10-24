> 自學網頁遊戲開發，參考網頁:  [Phaser  幫我撐個 30 天](https://ithelp.ithome.com.tw/users/20111617/ironman/1794)、[Note of Phaser3](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/)

# Interactive

> [鍵盤式互動](#鍵盤式互動)



> [觸控式互動](#觸控式互動)



>[Sprite sheet](#Sprite sheet)



### 鍵盤式互動

>[keyboard event](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/)、[偵測碰撞](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/geom-point/)

```js
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

// 偵測碰撞
scene.update = function () {
    .....
    let playerRect = this.player.getBounds()
    let houseRect = this.house.getBounds()

    // 檢測兩個物件碰撞重疊的狀況
    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, houseRect)) {
        console.log('到家了')
    }
}
```



## 觸控式互動

> [click event](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-basesizer/?h=click#click)、[拖移物件](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/board-miniboard/)、[Tween](https://ithelp.ithome.com.tw/articles/10205949)(配合使用者點擊或滑鼠hover做效果)

```js
// click event
scene.update = function() {
    //前面內容....
    // 當使用者點擊在畫面上（手機也適用）
    if (this.input.activePointer.isDown) {		
        this.player.x += this.playerSpeed
    }
}

// 拖移物件
scene.create = function() {
    //.....
    // 用setInteractive()把物件設為可互動
    this.man = this.add.sprite(50, 255, 'man', 0).setInteractive()

    this.input.setDraggable(this.man)

    // 偵聽 drag
        this.input.on('drag', function(pointer, gameObj, dragX, dragY) {
        gameObj.x = dragX
        gameObj.y = dragY
    })
}

// Tween
scene.create = function() {
    //...
    // 把物件的 origin 設在中間正下方，並設為可互動
    this.man = this.add.sprite(50, 310, 'man', 0).setOrigin(0.5, 1).setInteractive()

    // 對於 man 增加 tweens 動畫
    this.man.scaleTween = this.tweens.add({
        targets: this.man,  // 要動畫的物件
        alpha: 0.8    // 調整透明度
        scaleX: 1.2,  // 變大
        scaleY: 1.2,
        duration: 1000  // 變化速度(ms)
        paused: true  // 設定載入完成動畫先不執行
        yoyo: true    // 會變回原樣(花的時間會變兩倍)
    })
    
    // 新增事件 --> 點擊物件，啟動動畫
    this.man.on('pointerdown', () => {
    	this.man.scaleTween.restart()
	})
    // 新增事件 --> hover物件，啟動動畫
    this.man.on('pointerover', () => {
        this.man.alphaTween.restart()
    })
    // 新增事件 --> 離開物件，停止動畫，透明度變回來
    this.man.on('pointerout', () => {
        this.man.alphaTween.stop()	// 防止透明度變成1了動畫還在執行，最後還是半透明
        this.man.alpha = 1
    })
}
```



### Sprite sheet

>加入Sprite sheet、[animation](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/animation/?h=anims)

```js
scene.preload = function() {
    //.....
    this.load.spritesheet('man', 'assets/man.png', {
        frameWidth: 80,				// 每幀圖片的寬 240 / 3
        frameHeight: 110			// 高度
    })
}

scene.create = function() {
    //...
    this.player = this.add.sprite(50, 255, 'man', 0)

    // 創建正面 anims
    this.anims.create({
        key: 'turn'
        frames: [{ key: 'player', frame: 0 }],
        frameRate: 10
    })

    // 創建像右走 anims
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: -1
    })

    this.keyboard = this.input.keyboard.createCursorKeys()
}

scene.update = function() {
    //....
    if (this.keyboard.right.isDown) {
        this.man.x += 2
        this.man.anims.play('right', true)
    } else {
        this.man.anims.play('turn')
    }
}
```







### 





