import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password,  setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {email, password });
      setUser(data);
      alert('logged in successfully');
      setRedirect(true);
    } catch (error) {
      alert('login failed')
    }
  }

  // async function handleLoginSubmit(ev) {
  //   ev.preventDefault();
  //   try {
  //     const data = await axios.post('/login', { email, password });
  //     if (data) {
  //       setUser(data); // Assuming the user data is returned in the response
  //       alert('Logged in successfully');
  //       setRedirect(true);
  //     } else {
  //       alert('Login failed');
  //     }
  //   } catch (error) {
  //     alert('Login failed');
  //   }
  // }
  

  if(redirect) { 
    return <Navigate to={'/'}/>
  }

  return (
    <div className=""
         style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}>
          
      <div className="bg-white p-3 rounded shadow-md w-96 mx-auto mt-6 mb-48">
        <h1 className="text-2xl font-semibold mb-6 text-center">LOGIN</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
           
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
            className="bg-blue-500 text-white  px-4 rounded hover:bg-blue-600 focus:outline-none primary"
          >
            Login
          </button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account? <Link to={"/register"} className='underline text-black'>Register</Link>
            
          </div>
        </form>
      </div>
    </div>
  );
}
