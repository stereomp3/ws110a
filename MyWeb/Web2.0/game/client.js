var socket = new WebSocket("ws://"+window.location.hostname+":8080")  // 連到server port

// 開啟時觸發
socket.onopen = async function (event) { 
    console.log(event.data)
    console.log('socket:onopen()...') 
    let user = await window.fetch('http://127.0.0.1:8666/user')
    user.text().then(function(data){
        console.log(data)
        //document.getElementsByClassName("topNavText")[0].appendChild(document.createTextNode("*"+data))
        socket.send(JSON.stringify(data))
    })
}
socket.onerror = function (event) { console.log('socket:onerror()...') }
// 關閉時觸發
socket.onclose = function (event) { console.log('socket:onclose()...') }
// 有字串時觸發 // server傳給client
socket.onmessage = function(event){
    console.log(event.data);
    var line = JSON.parse(event.data);  // JSON.parse把JSON檔案轉物件
    document.getElementsByClassName("topNavText")[0].appendChild(document.createTextNode(line))
}
