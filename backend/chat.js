import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors  from "cors";
const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5174",
  credentials: true}));
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [],
});
const generate=async(usermessage)=>{
    try{
        let result = await chat.sendMessage(usermessage);
        console.log("Generated response:", result.response.text()); 
        return result.response.text();
        }
    
    catch(err)
    {
        console.log(err);
    }
}


app.post('/api/ask',async(req,res)=>{
    console.log("Received request with body:", req.body); 
    const data=req.body.ask;

  if (!data) {
    return res.status(400).send({ response: "Invalid request" });
  }

    if (!data) return res.status(400).send({ response: "Invalid request" });
    const result=await generate(data);
    console.log("Generated result:", result); 
    res.send({response:result});
})
const port=process.env.PORT || 5005
app.listen(port,()=>{
    console.log("server is running")
})