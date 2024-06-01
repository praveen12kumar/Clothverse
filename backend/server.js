import app from "./app.js";
import {config} from "dotenv";
import connectDB from "./db/index.js";
import Razorpay from "razorpay";

config({
    path:".env"
})

export const instance = new Razorpay({
    key_id:process.env.RAZOR_PAY_API,
    key_secret:process.env.RAZOR_PAY_SECRET
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    });
})
.catch((err)=>{
    console.log("MONGO db connection failed", err)
})


