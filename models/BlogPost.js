import mongoose from "mongoose";

// creating the Schema for Blog Database
const blogPostSchema= new mongoose.Schema(
    {
    title:String, 
    description:String
    },
    {
    timestamps:true //for the time association
    }   
);

// blogPost is the Model and blogPostSchema is the Schema
const blogPost = mongoose.model("BlogPost",blogPostSchema)

export default blogPost