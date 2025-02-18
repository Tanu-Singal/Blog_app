import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import Blogmodel from './Blog/[id]/lib/models/BlogModel.js';
import Emailmodel from './Blog/[id]/lib/models/Emailmodel.js';
import { connectdb } from './Blog/[id]/lib/config/db.js';


/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/images"); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});*/
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = file.originalname.split('.').pop();
        cb(null, `${timestamp}.${extension}`);
    }
});

const upload = multer({ storage: storage });*/

cloudinary.config({ 
  cloud_name:'dpfp7isvu',
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin:"https://blog-app852.onrender.com",
  methods:['GET','POST','DELETE','PUT'],
  credentials: true,
})); 

app.use(express.json());
//app.use("/images", express.static("upload/images"));
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

const loaddb = async () => {
  try {
    await connectdb(); 
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
loaddb();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [],
});
const generate=async(usermessage)=>{
    try{
        let result = await chat.sendMessage(usermessage);
        console.log("Generated response:", result.response.text); 
        return result.response.text();
        }
    
    catch(err)
    {
        console.log(err);
    }
}
app.get("/api/blog",async (req,res)=>{
   const BlogId=req.query.id; //because the id will get from query

   if(BlogId)
   {
 
    const blog=await Blogmodel.findById(BlogId);
    res.send({status:1,obj:blog})
   
   }
   else{
    const blogs=await Blogmodel.find({})
    res.send({status:1,msg:"API working",obj:{blogs}})
   }
  
})//on homepage no blog id is present to ye sabhi blog ka data bhj dega or agr id hai means we open a blog thn vo usi particular blog ka data send krega
/*app.post("/upload", async (req, res) => {

 
  const file = req.files.image;

    // Upload file to Cloudinary
    const uploadres = await cloudinary.uploader.upload(file.tempFilePath);
    const {title,description, category, author, authorImg}=req.body;
    const newblog=new Blogmodel({
      title,
      description,
      category,
      author,
      image:uploadres.secure_url, 
      image_public_id: uploadres.public_id, 
      authorImg,
    })
   
    console.log("Cloudinary Response:", uploadres);
    newblog.save()
  .then(() => {
    res.send({ status: 1, msg: "Blog saved",  image_url: uploadres.secure_url});
  })
});*/
app.post("/upload", async (req, res) => {
  try {
    // Check if file exists
    if (!req.files || !req.files.image) {
      return res.status(400).json({ status: 0, msg: "No file uploaded" });
    }

    const file = req.files.image;

    // Upload file to Cloudinary
    const uploadres = await cloudinary.uploader.upload(file.tempFilePath);
    
    if (!uploadres.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    // Destructure request body
    const { title, description, category, author, authorImg } = req.body;

    // Create new blog entry
    const newblog = new Blogmodel({
      title,
      description,
      category,
      author,
      image: uploadres.secure_url,
      image_public_id: uploadres.public_id,
      authorImg,
    });

    // Save blog to database
    await newblog.save();

    res.json({ status: 1, msg: "Blog saved", image_url: uploadres.secure_url });

  } catch (error) {
    console.error("Error in /upload:", error.message);
    res.status(500).json({ status: 0, msg: "Internal Server Error", error: error.message });
  }
});
app.post('/api/ask', async (req, res) => {
  console.log("Received request with body:", req.body);
  const data = req.body.ask;

  if (!data || typeof data !== 'string') {
    return res.status(400).send({ response: "Invalid request. 'ask' must be a string." });
  }

  try {
    const result = await generate(data);
    console.log("Generated result:", result);
    res.send({ response: result });
  } catch (err) {
    console.log("Error in /api/ask:", err);
    res.status(500).send({ response: "Internal server error while generating response." });
  }
});

app.delete("/api/blog/:id",async(req,res)=>{
  const blogId=req.params.id;
  const blog=await Blogmodel.findById(blogId);
  if (blog.image_public_id) {
    await cloudinary.uploader.destroy(blog.image_public_id);
  }
  await Blogmodel.findByIdAndDelete(blogId);

  res.send({ status: 1, msg: "Blog and image deleted successfully" });
})

  //const {title,description, category, author, authorImg}=req.body;
 // const image = req.file ? req.file.path : null;
  /*const newblog=new Blogmodel({
    title,
    description,
    category,
    author,
    image:uploadres.secure_url, 
    authorImg,
  })
   
  newblog.save()
  .then(() => {
    res.send({ status: 1, msg: "Blog saved",  image_url: uploadres.secure_url});
  })*/


/*app.post('/upload', upload.single('image'), (req, res) => {
  console.log("Request received");
  console.log("file received ", req.file);
  
  res.send("File uploaded successfully");
});*/

app.get("/api/email" , async(req,res)=>{
  const emails=await Emailmodel.find({});
  res.send({status:1,emails});
})
app.post("/api/email", async (req, res) => {
  try {
      const { email } = req.body;

      const newEmail = new Emailmodel({ email });
      const savedEmail = await newEmail.save();
      
      console.log("Saved email in DB:", savedEmail);
      
      res.status(201).json({ status: 1, msg: "Email added successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});
app.delete("/api/email/:id",async(req,res)=>{
  const emailId=req.params.id;
  const email=await Emailmodel.findById(emailId);
  if (!email) {
    return res.status(404).send({ status: 0, msg: "Email not found" });
  }
 await Emailmodel.findByIdAndDelete(emailId)
 res.send({status:1,msg:"Email deleted"})
})
const port=process.env.PORT || 3003
app.listen(port,()=>{
  console.log("server is running")
})
