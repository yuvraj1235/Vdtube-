import {app} from "./app.js"
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
const PORT =8000

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`The port is running on the server ${PORT}`);
    
})
})
.catch((error)=>{
    console.log("Mongodb error",error);
    
})