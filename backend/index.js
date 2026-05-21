import app from "./app.js";
import { config } from "./src/config.js";
import "./database.js"

function main (){
    app.listen(config.server.PORT)
    console.log("SERVER RUNNING IN "+config.server.PORT)
}

main()