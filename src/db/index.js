import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"


const connectDB=async()=>{
    try {
        // const connection_instance=await mongoose.connect(`${process.env.MONGO_DB}/${DB_NAME}`)
        const connection_instance=await mongoose.connect("mongodb+srv://user:user_123@cluster0.crrwfdn.mongodb.net/vdtube")
        console.log("connected",connection_instance);
        
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}
export default connectDB