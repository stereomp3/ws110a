
// 創建場景
let scene = new Phaser.Scene('Game')

// 基本配置
let config = {
    type: Phaser.AUTO,	// 會使用 WebGL 或 Canvas API，AUTO 是讓 Phaser 決定
    width: 960,
    height: 480,
    scene,			// 等同於 scene: scene
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: { y: 1000 },
            debug: true       // debug 提供給我們更多畫面訊息(圖片的外框)，更有幫助開發
        }
    },
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
        this.load.image('player02', 'assets/player02.png')  //「player02」當作一個標籤
        
        this.load.spritesheet('player', 'assets/slime.png',{
            frameWidth: 64,				// 每幀圖片的寬
            frameHeight: 64		// 高度
        })

        this.load.tilemapTiledJSON('map', 'data/map.json')
        this.load.spritesheet('tilemap01', 'data/picture/tilemap01.png',{
            frameWidth: 32,				// 每幀圖片的寬
            frameHeight: 32			// 高度
        })
        this.load.spritesheet('tilemap02', 'data/picture/tilemap02.png',{
            frameWidth: 64,				// 每幀圖片的寬
            frameHeight: 64			// 高度
        })
        
        this.load.image('ground', 'assets/ground_n.png')

        // 創建 text
        let percentText = this.add.text(320, 160, '', {
            font: '24px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5) // 把文字置中
        let assetText = this.add.text(320, 200, '', {
            font: '18px monospace',
            fill: '#AAAAAA'
        }).setOrigin(0.5, 0.5) 

        // 畫出進度條
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(150, 135, 320, 50);

        
        // 偵聽處理檔案
        this.load.on('progress', value => {
            percentText.setText(parseInt(value * 100) + '%')
            progressBar.clear();  // 避免進度條一直疊加
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(160, 145, 300 * value, 30);
            console.log(value)
        })

        this.load.on('fileprogress', file => {
            assetText.setText('Loading asset: ' + file.key);
            console.log(file.src);
        });
        
        // 偵聽載入檔案結束
        this.load.on('complete', () => {
            console.log('complete');
            percentText.destroy()		// 載入完，把它從畫面上清除
            assetText.destroy()
            progressBar.destroy();
            progressBox.destroy();
        })
    }

    scene.create = function(){
        this.keyboard = this.input.keyboard.createCursorKeys() // 取得鍵盤輸入
        this.physics.world.setBounds(0, 0, 1600, 1600); // setBounds(x, y, width, height)
/*
        this.bg = this.add.sprite(0, 0, 'bg')
        this.bg.setOrigin(0,0)	
        this.bg.displayWidth = 1600
        this.bg.displayHeight = 1600*/

        this.player02 = this.add.sprite(600, 223, 'player02')

        this.player = this.physics.add.sprite(150, 1200, 'player').setInteractive()
        this.player.depth = 1	// 預設 depth(z-index) 為 0，這裡設定 1
        this.player.flipX = true
        this.player.body.collideWorldBounds = true;
        
        this.map = this.make.tilemap({key: 'map'})
        this.tiles01 = this.map.addTilesetImage('tilemap01')
        this.tiles02 = this.map.addTilesetImage('tilemap02')

        this.backgroundLayer01 = this.map.createStaticLayer('background', this.tile01, 0, 0)
        this.backgroundLayer02 = this.map.createStaticLayer('background02', this.tile02, 0, 0)
        //使用 Tiled Map Editor 做的 Blocked 圖層
        this.blockedLayer01 = this.map.createStaticLayer('block', this.tile01, 0, 0)
        this.blockedLayer02 = this.map.createStaticLayer('block02', this.tile02, 0, 0)

        // 設定物理性質的作用範圍 setSize(width, height, center) // center != 0 在中間(default)， else 從最左邊
        this.player.body.setSize(10, 46)

        // 讓兩個物件產生碰撞
        this.physics.add.collider(this.player, this.blockedLayer01)
        this.physics.add.collider(this.player, this.blockedLayer02)

        // 創建走 anims
        this.anims.create({
            key: 'jumpdown',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 10,
        })
        // 創建走 anims
        this.anims.create({
            key: 'jumpup',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
        })
        // 創建走 anims
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
        })
        this.text = this.add.text(30,20,'x:0',{
            font: '24px Open San',
            fill: '#000000'
        })

        // 設定相機邊界      
        this.cameras.main.setBounds(0, 0, 1600, 1600)  // setBounds(x, y, width, height)
        this.cameras.main.startFollow(this.player)  // 相機跟隨
    }

    scene.update = function(){
        let playerRect = this.player.getBounds()
        let player02Rect = this.player02.getBounds()

        
        // 檢測兩個物件碰撞重疊的狀況
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, player02Rect)) {
            this.gameOver();
        }
        if (this.keyboard.right.isDown) {
            this.player.x += this.playerSpeed
            this.player.flipX = true //翻轉
            this.player.anims.play("move", true)
            this.text.setText('x: '+this.player.x)
        }
        if (this.keyboard.left.isDown) {
            this.player.x -= this.playerSpeed
            this.player.flipX = false
            this.player.anims.play("move", true)
            this.text.setText('x: '+this.player.x)
        } 
        if (this.player.body.blocked.down && this.keyboard.space.isDown) {
            this.player.anims.play("jumpup", true)
            this.player.body.setVelocityY(-500)
            
        }
        if (this.keyboard.down.isDown) {
            this.player.y += this.playerSpeed 
            this.player.body.stop();
        } 
        if (this.keyboard.up.isDown) {
            this.player.y -= this.playerSpeed * 4
            
        }
        if(!this.player.body.blocked.down && this.player.body.velocity.y > 200){
            this.player.anims.play("jumpdown", true)
        }
    }

    scene.gameOver = function() {
        // 500 ms 相機 shake 效果
        this.cameras.main.shake(500)					
        
        // 偵聽 shake 動畫結束
        this.cameras.main.on('camerashakecomplete', () => {
            // 500 ms 相機 fade 效果
            this.cameras.main.fade(500)				
        })
        
        // 偵聽 fade out 動畫結束
        this.cameras.main.on('camerafadeoutcomplete', () => {	
            // 遊戲重新
            this.scene.restart()						
        })
    }
}