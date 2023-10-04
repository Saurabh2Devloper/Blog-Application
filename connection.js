//importing mongoose
import mongoose from "mongoose"; 
// Daytabase : BLog Application 02
// Connection Atlas URI
const MONGO_URI="mongodb+srv://saurabhmhatre:Saurabh123@cluster0.gedpcel.mongodb.net/Blog?retryWrites=true&w=majority"

// Conncetion Function
const connectDB = async()=>{
    const connection = await mongoose.connect(MONGO_URI)
    if(connection){
        console.log("Database Connected")
    }
    else{
        console.log("Error in connection")
    }
}

export default connectDB;