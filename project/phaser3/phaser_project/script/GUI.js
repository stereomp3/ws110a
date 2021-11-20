var hp = 150
function StartGUI(){
    let timer = new Date().getSeconds() 
    GUI.preload = function() {
        this.load.spritesheet('Avatar', 'assets/slime.png',{
            frameWidth: 64,				// 每幀圖片的寬
            frameHeight: 64		// 高度
        })
        // 移動到場景上面
        this.scene.moveBelow('Game', 'GUI');
    }
    GUI.create = function(){
        // 取得
        this.MainScene = GameScene.scene.get("Game");

        // 導入主角圖片變頭像
        this.BloodBox = this.add.graphics();
        this.BloodBox.fillStyle(0x555555, 0.8);
        this.BloodBox.fillRoundedRect(2, 10, 40, 35, 5);

        this.player = this.add.sprite(20, 20, 'Avatar', 0) // sprite(x, y, key, frame)
        this.player.setScale(0.7)
        this.player.flipX = true

        // 畫出血條和文字
        this.BloodBox = this.add.graphics();
        this.BloodBox.fillStyle(0x222222, 0.8);
        this.BloodBox.fillRoundedRect(95, 15, 160, 25, 5);
      
        this.BloodBar = this.add.graphics();
        this.BloodBar.fillStyle(0xff2400, 1);
        this.BloodBar.fillRoundedRect(100, 20, 150, 15, 3);
        this.BloodBar.depth = 1

        this.text = this.add.text(50,15,'HP:',{
            font: '24px Open San',
            fill: '#922222'
        })
    }
    let timer_run
    GUI.update = function(){
        timer_run = new Date().getSeconds() 
        // 每5秒執行一次
        if(Math.abs(timer_run - timer) >= 1 && hp >= 5){
            console.log(timer)
            timer = new Date().getSeconds() 
            hp -= 5
            this.BloodBar.clear()
            this.BloodBar.fillStyle(0xff2400, 1);
            this.BloodBar.fillRoundedRect(100, 20, hp, 15, 0);
        }
        
    }
}