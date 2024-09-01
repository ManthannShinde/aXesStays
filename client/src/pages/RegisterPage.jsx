import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try {
          await axios.post('/register', {
            name,
            email,
            password,
        });
        alert('Registration Successful');
        } catch (error) {
          alert('Registration failed : Duplicate email used. Try again');
        }
    }

  return (
    <div className=""
         style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
      <div className="bg-white p-3 rounded shadow-md w-96 mx-auto mt-6 mb-48">
        <h1 className="text-2xl font-semibold mb-6 text-center">REGISTER</h1>
        <form onSubmit={registerUser}>
            <div className="mb-4">
            {/* <label htmlFor="email" className="block text-gray-600">Email</label> */}
            <input
              type="text"
              id="text"
              className="border hover:border-primary rounded w-full  px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter Name"
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <label htmlFor="email" className="block text-gray-600">Email</label> */}
            <input
              type="email"
              id="email"
              className="border hover:border-primary rounded w-full  px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <label htmlFor="password" className="block text-gray-600">Password</label> */}
            <input
              type="password"
              id="password"
              className="border hover:border-primary rounded w-full  px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white  px-4 rounded hover:bg-blue-600 focus:outline-none primary"
          >
            Sign Up
          </button>
          <div className='text-center py-2 text-gray-500'>
            Already a member? <Link to={"/login"} className='underline text-black'>Login</Link>
            
          </div>
        </form>
      </div>
    </div>
  );
}
