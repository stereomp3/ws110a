let is_jump = false
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

        this.load.spritesheet('player', 'assets/slime.png',{
            frameWidth: 64,				// 每幀圖片的寬
            frameHeight: 64		// 高度
        })

        this.load.tilemapTiledJSON('main01', 'data/main01.json')
        this.load.spritesheet('PixelAtlas', 'assets/PixelAtlas.png',{
            frameWidth: 32,				// 每幀圖片的寬
            frameHeight: 32			// 高度
        })
        
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

        this.player = this.physics.add.sprite(800, 900, 'player').setInteractive()
        this.player.depth = 1	// 預設 depth(z-index) 為 0，這裡設定 1
        this.player.flipX = true
        this.player.body.collideWorldBounds = true;
        
        this.map = this.make.tilemap({key: 'main01'})
        this.tiles = this.map.addTilesetImage('PixelAtlas')

        this.bakcgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0)

        // 使用 Tiled Map Editor 做的 Blocked 圖層
        this.blockedLayer = this.map.createStaticLayer('block', this.tiles, 0, 0)
        this.blockedLayer.setCollisionByExclusion([-1])
        
        // 設定物理性質的作用範圍 setSize(width, height, center) // center != 0 在中間(default)， else 從最左邊
        this.player.body.setCircle(17, 19, 24)
        
        // 讓兩個物件產生碰撞
        this.physics.add.collider(this.player, this.blockedLayer)

        this.anims.create({
            key: 'jumpdown',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'jumpup',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'jumptwo',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
        })
        // 設定相機邊界      
        this.cameras.main.setBounds(0, 0, 1600, 1600)  // setBounds(x, y, width, height)
        this.cameras.main.startFollow(this.player)  // 相機跟隨
    }
    
    scene.update = function(){

        if(!this.player.body.blocked.down && this.player.body.velocity.y>=0 && this.keyboard.space.isDown && is_jump) {
            this.player.anims.play("jumptwo", true)
            this.player.body.setVelocityY(-500) 
            is_jump = false
        }
        if (this.player.x > 1216 && this.player.y > 1184){
            this.player.body.immovable = true
            this.player.alpha = 0.5
            this.player.body.setAcceleration(0, -700);
            if(this.keyboard.space.isDown){
                is_jump = true
                this.player.anims.play("jumpup", true)
                this.player.body.setVelocityY(-200) 
            }
        }
        else{
            this.player.alpha = 1
            this.player.body.setAcceleration(0, 0);
        }
        // 在地面而且按下空白鍵
        if (this.player.body.blocked.down && this.keyboard.space.isDown) { 
            is_jump = true  
            this.player.anims.play("jumpup", true)
            this.player.body.setVelocityY(-500)     
        }
        if (this.keyboard.right.isDown) {
            this.player.x += this.playerSpeed
            this.player.flipX = true //翻轉
            if(this.player.body.blocked.down) this.player.anims.play("move", true)
        }
        if (this.keyboard.left.isDown) {
            this.player.x -= this.playerSpeed
            this.player.flipX = false
            if(this.player.body.blocked.down) this.player.anims.play("move", true)
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
}
