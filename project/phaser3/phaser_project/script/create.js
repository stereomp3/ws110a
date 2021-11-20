function create(){
    GameScene.create = function(){
        this.music = this.sound.add('drumSong01', {loop: true});
        this.music.play()
        this.keyboard = this.input.keyboard.createCursorKeys() // 取得鍵盤輸入
        this.physics.world.setBounds(0, 0, 9600, 1600); // setBounds(x, y, width, height)

        this.player = this.physics.add.sprite(3300, 600, 'player').setInteractive()
        this.player.depth = 1	// 預設 depth(z-index) 為 0，這裡設定 1
        this.player.flipX = true
        this.player.body.collideWorldBounds = true;
        
        /*this.bullet = this.add.sprite(0, 0, "bullet")
        this.physics.add.existing(this.bullet);
        this.bullet.body.setBounce(1)
        //this.bullet.body.setAllowGravity = false;
        this.bullet.setActive(false)
        this.bullet.setVisible(false)
        // const bullets = scene.add.group();
        // bullets.add(bullet);*/

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
       /* this.physics.add.collider(this.bullet, this.blockedLayer)*/

        PlayerAnimate(this)
        
        // 設定相機邊界      
        this.cameras.main.setBounds(0, 0, 9600, 1600)  // setBounds(x, y, width, height)
        this.cameras.main.startFollow(this.player)  // 相機跟隨


        this.keyC = this.input.keyboard.addKey('C')
    }
}


function PlayerAnimate(scene){
    scene.anims.create({
        key: 'jumpdown',
        frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
    })
    scene.anims.create({
        key: 'jumpup',
        frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
    })
    scene.anims.create({
        key: 'jumptwo',
        frames: scene.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
    })
    scene.anims.create({
        key: 'move',
        frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
    })
}