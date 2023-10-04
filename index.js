import express from "express";
import  cors from "cors";//for handling platform policy error
import connectDB from "./connection.js";
import blogPost from "./models/BlogPost.js";


// Connecting to Database
connectDB();
// App instantiation
const app = express();
const port=5000;

// Middlewares cors and Json
app.use(express.json())
app.use(cors());

// routes for Application Server side :
// Route 01 : Post All Blogs
app.post("/post-blog",async(req,res)=>{
    // Impating in Schema of Database
    let blog=new blogPost({
        title:req.body.title,
        description:req.body.description,
    })
    // Saving in Database
    await blog.save();
    res.json({message:"Blog Post Saved Successfully"})
})


// Route 02 : Get all blogs
app.get("/get-blogs",async(req,res)=>{
    // MongoDB Query
    let blogs=await blogPost.find();
    // condition
    if(!blogs){
        res.status(404).json({message:"No Blogs Found"})
    }
    res.json({blogs})    
})


// Route .03 Delete a Blog
app.delete("/delete-blog/:id",async(req,res)=>{
    // mongodb Query
    let blog = await blogPost.findByIdAndDelete(req.params.id)
    // Conditions
    if(!blog){
     res.status(404).json({message:"No Blogs Found"})   
    }
    res.status(200).json({message:"Blog Deleted Succesfully"})
})


// Route 04 : upadte the blog
app.put("/update-blog/:id",async(req,res)=>{
    // Mongodb Query
    let blog = await blogPost.findByIdAndUpdate(req.params.id)
    // Conditions of Updations
    // Update karayla blog ch nasel tar
    if(!blog){
        res.status(404).json({message:"Blog NOt Found"})
    } 
    // update karnaryani doni pn nahi takle tar
    if(!req.body.title && !req.body.description){
        res.json({message:"Please Enter Title or Description"})
    }
    // Title nahi change kel
    else if(!req.body.title){
        blog.description=req.body.description;
    }
    // Description nahi change kel
    else if(!req.body.description){
        blog.title=req.body.title;
    }
    // Ijjatit Doni Change kel
    else{
        blog.title=req.body.title;
        blog.description=req.body.description;
    }
    // in every case saving the changes
    await blog.save();
    res.status(200).json({message:"Blog Upadted Succcessfuly"})
})


// Listeinig the Port
app.listen(port,()=>{
    console.log(`Server is Running on  ${port}`)
})

