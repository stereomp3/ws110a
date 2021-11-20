window.onload = function() {
    function resize() {
        let canvas = document.querySelector('canvas')
        let ww = window.innerWidth
        let wh = window.innerHeight
        let wRatio =  ww / wh
        let gameRatio = config.width / config.height
        // 比值一樣，填滿螢幕
        if (wRatio < gameRatio) {
            canvas.style.width = ww + 'px'
            canvas.style.height = ( ww / gameRatio ) + 'px'
        } else {
            canvas.style.width = ( wh * gameRatio ) + 'px' // 比值不一樣寬做調整
            canvas.style.height = wh + 'px' 
        }
    }
    resize()
    window.addEventListener('resize', resize, false)	// 偵聽事件 resize
}