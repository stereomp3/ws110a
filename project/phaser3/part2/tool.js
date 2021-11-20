window.onload = function() {
    function resize() {
        let canvas = document.querySelector('canvas')
        let ww = window.innerWidth
        let wh = window.innerHeight
        let wRatio =  ww / wh
        let gameRatio = config.width / config.height
        if (wRatio < gameRatio) {
            canvas.style.width = ww + 'px'
            canvas.style.height = ( ww / gameRatio ) + 'px'
        } else {
            canvas.style.width = ( wh * gameRatio ) + 'px'
            canvas.style.height = wh + 'px'
        }
    }
    resize()
    window.addEventListener('resize', resize, false)	// 偵聽事件 resize
}