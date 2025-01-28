import mongoose from "mongoose";
export const connectdb=async()=>{
await mongoose.connect('mongodb+srv://tanusingal7:TAnuSinGal@cluster0.umdpk.mongodb.net/blog-app')
console.log("DB Connected")
}


