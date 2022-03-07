const http = require('http');
const webSocketServer = require('websocket');

//crearte http request wich will pass to the webSocket
//Handshake path
//1.create http request
//switching protocol from http to websocket protocol
const httpserver=http.createServer((req,res)=>{
    console.log("we have recieved request");
})

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res 
const webSocket=new webSocketServer({
    "httpServer":httpserver
})

http.listen(8080,()=>{
    console.log("My server is listening on port 8080")
})


//when websocket connect