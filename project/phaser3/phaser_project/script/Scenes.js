function StartGame(){
    Start.preload = function() {
        this.load.image('bg', 'assets/bg.png')
        this.load.image('title', 'assets/title.png')
        this.load.spritesheet('label', 'assets/label.png',{
            frameWidth: 160,	// 每幀圖片的寬
            frameHeight: 45		// 高度
        })
        this.load.audio('drun01', 'audio/drun01.wav'); 
        this.load.audio('touch01', 'audio/touch01.wav');
    }
    Start.create = function(){
        this.music = this.sound.add('drun01', {loop: true});
        this.music.play()
        let width = this.sys.game.config.width	// 取得 config 的 width : 640
        let height = this.sys.game.config.height
        
        this.bg = this.add.sprite(0, 0, 'bg')
        this.bg.setOrigin(0,0)
        this.bg.displayWidth = width
        this.bg.displayHeight = height

        this.title = this.add.sprite(450, 100, 'title')
        //this.title.setScale(2)
        
        // 選項控制
        this.label01 = this.add.sprite(450,200,'label',0).setInteractive()
        this.label02 = this.add.sprite(450,260,'label',1).setInteractive()
        this.label03 = this.add.sprite(450,320,'label',2).setInteractive()

        this.label01.on('pointerover', () => label_ontouch(this, 450,200,'label',3))
                    .on('pointerout', () => label_ontouch(this,450,200,'label',0))
                    .on('pointerdown', () => gameStart(this))

        this.label02.on('pointerover', () => label_ontouch(this, 450,260,'label',4))
                    .on('pointerout', () => label_ontouch(this, 450,260,'label',1))
                    .on('pointerdown', () => console.log('click'))

        this.label03.on('pointerover', () => label_ontouch(this, 450,320,'label',5))
                    .on('pointerout', () => label_ontouch(this, 450,320,'label',2))
                    .on('pointerdown', () => console.log('click'))
    }
    
    Start.update = function(){
        if(SceneManeger == "Start") this.music.resume();
        else this.music.pause();
    }
}
function option_mode(){

}
function tourist_mode(){

}
/*function EndGame(){

}*/





function label_ontouch(scene, x, y, key, frame){
    scene.label = scene.add.sprite(x, y, key, frame)
    scene.sound.play('touch01');
}

function gameStart(scene){
    scene.scene.launch("GUI")
    scene.scene.wake("Game")
    scene.scene.sleep("Start")
    SceneManeger = "Game"
    StartGUI()
}