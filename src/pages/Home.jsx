// Importing Hooks and React-Icons
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

// Functional Compoent Home
const Home = () => {

  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")


  useEffect(() => {
    getPosts();
  }, [posts]);

    // Getting the Post From Backend
    const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blogs");
    const data = await response.json();
    console.log(data.blogs);
    setPosts(data.blogs);
    };

  // Deleting the Post By ID
  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`,
      {
        method: "DELETE",
      });
    // Condtions
    if (response.status == 200) {
      alert("Blog Deleted Successfully")
    }
    else {
      alert("Something wend wrong")
    }
  }


  // Updating the Post
  // Schema for Updated Blog
  const updatedBlog = {
    title: title, 
    description: description, 
  };


  // Update Method
  const updatePost = async (id) => {
  const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog), // Send the updated blog object
    });

    // Conditions
    if (response.status === 200) {
      alert("Blog updated Successfully");
      getPosts(); // Refresh the list of posts after update
    } else {
      alert("Something went wrong");
    }
  };

  // UI Returned
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="grid gap-4">
      {/* Map for Posting all Blogs on Home Page */}
        {
          posts.map((post) => (
          <div
            key={post._id} // _id is a unique identifier for each post
            className="bg-white shadow-lg rounded-lg p-4"
          >
           <div className="flex justify-between items-center mb-2">

              <h2 className="text-xl font-semibold outline-none focus:bg-gray-300"
                contentEditable={editPost} //TO edit Directly
                onInput={(e) => { setTitle(e.target.innerText) }}
              >{post.title}
              </h2>

        
              <div className="flex space-x-2">
                <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => { setSelectedPost(post._id); setEditPost(!editPost) }} />
                <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => { deletePost(post._id) }} />
              </div>

            </div>


            <p className="text-gray-600 outline-none focus:bg-gray-300" 
              contentEditable={editPost} //can edit Directly
              onInput={(e) => { setDescription(e.target.innerText) }}
            >{post.description}</p>
            
            <button //Conditional Rendering for the Button
              className={`${selectedPost === post._id && editPost ? 'block' : 'hidden'} bg-purple-500 hover:bg-green-500 px-3 py-1 my-6 font-bold text-white`}
              onClick={() => {updatePost(post._id);
              }}>Save
            </button>

          </div>
        ))
        }
      </div>
    </div>
  );
};

export default Home;
