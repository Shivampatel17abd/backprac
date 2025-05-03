import mongoose  from "mongoose";
import {DB_name} from '../constants.js';

const connectDB = async ()=>{
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
       console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
       // print the connectionInstance to get more knowladge
       
    } catch (error) {
        console.log("while connecting to database there is some error ",error);
        process.exit(1);
    }
}
export default connectDB;