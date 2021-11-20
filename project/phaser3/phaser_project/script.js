let is_jump = false
// 創建場景
let GameScene = new Phaser.Scene('Game')


// 基本配置
let config = {
    type: Phaser.AUTO,	// 會使用 WebGL 或 Canvas API，AUTO 是讓 Phaser 決定
    width: 960,
    height: 480,
    backgroundColor: "#5AE",
    scene: GameScene,			// 等同於 scene: scene
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: { y: 1000 },
            debug: true       // debug 提供給我們更多畫面訊息(圖片的外框)，更有幫助開發
        }
    },
}
var GUI = { preload, create, update }
var Start = { preload, create, update }
var option = { preload, create, update }
var tourist = { preload, create, update }

// 創建遊戲
let game = new Phaser.Game(config)
game.scene.add("Start", Start)
game.scene.add("GUI", GUI)
// undo
game.scene.add("option", Start)
game.scene.add("tourist", Start)


life_span()


