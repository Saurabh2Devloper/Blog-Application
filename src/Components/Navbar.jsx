import React from 'react'
import { Link } from 'react-router-dom'

// Functional COmponent Navbar
export const Navbar = () => {
  return (
    <>
      <nav className=" bg-blue-500 p-4 bg-center text-center">
        <ul className="justify-center text-center flex space-x-4 text-white">
          <li className='text-align-center'>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/create" className="hover:text-gray-200">Create Blog</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
