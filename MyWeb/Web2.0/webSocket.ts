import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket/mod.ts";

// websocket serve  //不能用一樣的port  // client要和這個連到同一個才能互相傳資料
const wss = new WebSocketServer(8080);

wss.on("connection", function (ws: WebSocketClient) {
	ws.on("message", function (message: string) { 
		console.log(message);
		//ws.send(message);
		// broadcast message
		// forEach是回乎函數，只要client沒關，這個就還會在，這邊做的效果是任何人傳訊息都會廣播給所有人
		wss.clients.forEach(function each(client) {
			if (!client.isClosed) {
				client.send(message);
			}
		});
	});
});

