import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateBlog from "./pages/CreateBlog"
import { Navbar } from "./Components/Navbar"

// Setting Routes with React Router DOM
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<CreateBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
)}