function preload(){
    // 生命週期_加載素材
    GameScene.preload = function() {
        this.load.audio('drumSong01', 'audio/drumSong01.wav'); 
        this.load.spritesheet('player', 'assets/slime.png',{
            frameWidth: 64,				// 每幀圖片的寬
            frameHeight: 64		// 高度
        })

        this.load.spritesheet('bullet', 'assets/bullet.png',{
            frameWidth: 64,				// 每幀圖片的寬
            frameHeight: 64			// 高度
        })
        this.load.tilemapTiledJSON('main01', 'data/main01.json')
        this.load.spritesheet('PixelAtlas', 'assets/PixelAtlas.png',{
            frameWidth: 32,				// 每幀圖片的寬
            frameHeight: 32			// 高度
        })



        // 創建 text
        let percentText = this.add.text(470, 160, '', {
            font: '24px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5) // 把文字置中
        let assetText = this.add.text(470, 200, '', {
            font: '18px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5) 
        percentText.depth = 1
        assetText.depth = 1

        // 畫出進度條
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x2f4f4f, 0.8);
        progressBox.fillRoundedRect(300, 135, 320, 50, 20);

        
        // 偵聽處理檔案
        this.load.on('progress', value => {
            percentText.setText(parseInt(value * 100) + '%')
            progressBar.clear();  // 避免進度條一直疊加
            progressBar.fillStyle(0xb0c4de, 1);
            progressBar.fillRoundedRect(310, 145, 300 * value, 30, 10);
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
            this.scene.sleep("Game");
            this.scene.launch("Start")
            
        })
    }
}