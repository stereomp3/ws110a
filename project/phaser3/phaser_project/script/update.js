function update(){
    GameScene.update = function(){
    if(SceneManeger == "Game"){
        PlayerController(this, this.player)
        Inwater(this, this.player)
        // shut
        PlayerAtk(this)
        // music 
        this.music.resume();
    }   
    else this.music.pause();
    }
}

function PlayerController(scene, GameOgj){
    // double jump
    if(!GameOgj.body.blocked.down && GameOgj.body.velocity.y>=0 && scene.keyboard.space.isDown && is_jump) {
        GameOgj.anims.play("jumptwo", true)
        GameOgj.body.setVelocityY(-500) 
        is_jump = false
    }
    // 在地面而且按下空白鍵 jump
    if (GameOgj.body.blocked.down && scene.keyboard.space.isDown) { 
        is_jump = true  
        GameOgj.anims.play("jumpup", true)
        GameOgj.body.setVelocityY(-500)     
    }
    if (scene.keyboard.right.isDown) {
        GameOgj.body.setVelocityX(200)
        GameOgj.flipX = true //翻轉
        if (GameOgj.body.blocked.down) GameOgj.anims.play("move", true)
    }
    if (scene.keyboard.left.isDown) {
        GameOgj.body.setVelocityX(-200)
        GameOgj.flipX = false
        if (GameOgj.body.blocked.down) GameOgj.anims.play("move", true)
    }
    // 不動時x速度為0
    if(!scene.keyboard.left.isDown && !scene.keyboard.right.isDown){
        GameOgj.body.setVelocityX(0)
    }
    if(!GameOgj.body.blocked.down && GameOgj.body.velocity.y > 100){
        GameOgj.anims.play("jumpdown", true)
    }

    if (scene.keyboard.down.isDown) {
        GameOgj.y += 1
        GameOgj.body.stop();
        //scene.scene.switch("GUI")
    } 
    if (scene.keyboard.up.isDown) {
        GameOgj.y -= 1 * 4
    }
}

let bullet_life = 0, bullet_timer = new Date().getSeconds()
function PlayerAtk(scene){
    let bullet
    timer_run = new Date().getSeconds()
    if(bullet_life <= 0){
        // bullet.destroy()
        /*
        scene.bullet.setActive(false)
        scene.bullet.setVisible(false)
        //scene.physics.world.disable(scene.bullet)*/
    }
    if(scene.keyC.isDown){
        bullet = scene.add.sprite(0, 0, "bullet")
        scene.physics.add.existing(bullet);
        bullet.x = scene.player.x + 64
        bullet.y = scene.player.y - 64
        /*&& !scene.bullet.active
        scene.physics.add.existing(scene.bullet);
        scene.bullet.x = scene.player.x + 64
        scene.bullet.y = scene.player.y - 64
        scene.bullet.setActive(true)
        scene.bullet.setVisible(true)
        bullet_life = 3*/
    }
    if(bullet_life > 0 && Math.abs(timer_run - bullet_timer) >= 1){
        bullet_life -= 1
        scene.bullet.body.setVelocityX(500)
        bullet_timer = new Date().getSeconds()
    }
    
}

function Inwater(scene, GameOgj){
    // in water
    if (GameOgj.x > 3456 && GameOgj.y > 768){
        if(GameOgj.body.velocity.y>=200) GameOgj.body.velocity.y = 200;
        GameOgj.alpha = 0.5
        if(scene.keyboard.space.isDown){
            is_jump = true
            GameOgj.anims.play("jumpup", true)
            GameOgj.body.setVelocityY(-200) 
        }
    }
    else{
        GameOgj.alpha = 1
        GameOgj.body.setAcceleration(0, 0);
    }
}

// 按鍵控制ispress，創立兩個變數，跟timer一樣，把isdown存入，要pre false， now true 才進入