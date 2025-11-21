const http = require("http")
const app = require("./src/config/express.config")
const server = http.createServer(app)
server.listen(9000,"localhost",((error)=>{
    if(!error){
        console.log("server is running on poer number 9000")
        console.log("Browse Server at http://localhost:9000")
        console.log("Press Ctrl + c to disconnect the server")
    }
}))