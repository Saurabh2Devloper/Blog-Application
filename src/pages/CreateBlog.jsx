import React from 'react';
import { useNavigate } from "react-router-dom"

// Functional Component
const CreateBlog = () => {
  const nevigate = useNavigate();

  // Posting Data 
  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    // Blog Structure
    const blog = {
      title,
      description,
    }

    // Sending Data From Front End To BAckend By Fetch
    const response = await fetch("http://localhost:5000/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog)
    });
    if (response.status == 200) {
      alert("Blog Posted Successfully")
      e.target.title.value = "";
      e.target.description.value = "";
      nevigate("/")
    }
    else {
      alert("Some thing went wrong")
    }
    console.log(title, description)
  }


  // Returned UI
  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      {/* Headinf */}
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      {/* Form for Input */}
      <form onSubmit={postData}> 
        {/* Input 01 : Title */}
        <div className="mb-4">
          <label 
          className="block text-gray-700 text-sm font-bold mb-2" 
          htmlFor="title">
            Title
          </label>
          <input
            className="border rounded-lg px-3 py-2 w-full"
            type="text"
            name='title'
            id="title"
            placeholder="Enter title..."
          />
        </div>

        {/* Input 02 : Description */}
        <div className="mb-4">
          <label 
          className="block text-gray-700 text-sm font-bold mb-2" 
          htmlFor="description">
            Description
          </label>
          <textarea
            className="border rounded-lg px-3 py-2 w-full"
            id="description"
            name='description'
            placeholder="Enter description..."
            rows="4"
          ></textarea>
        </div>

        {/* Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          type="submit">
          Post
        </button>

      </form>
    </div>
  );
};

export default CreateBlog;
