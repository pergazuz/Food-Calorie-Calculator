import React, { useState } from 'react';
import axios from './axiosConfig';

const Login = ({ showModal, setShowModal,setShowSignupModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/token/', {
        username: email,
        password: password,
      });
      if (response.status === 200) {
        const token = response.data.access;
        localStorage.setItem('authToken', token);

        alert("Login successful!");
        setShowModal(false);
        // Redirect to the desired page after successful login
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert("Error: Invalid credentials");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    showModal && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal(false);
          }
        }}
      >
        <div className="bg-white p-10 rounded-xl shadow-lg w-1/4">
          <h2 className="mb-4 mt-3 text-center text-4xl font-bold">Sign in</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 mt-8 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-slate-50"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-slate-50"
                placeholder="Password"
                required
              />
            </div>
            <button className="bg-[#F58767] mt-5 w-full hover:bg-[#F36234] drop-shadow-md text-white py-2 px-4 rounded-full font-medium" type="submit">
              Log in
            </button>
          </form>
          <button
            className="mt-4 text-black text-center w-full"
            onClick={() => {
              setShowModal(false);
              setShowSignupModal(true);
            }}
          >
            Don't have an account? <span className="text-[#F58767] font-medium hover:text-[#F36234]">Sign up</span>
          </button>
        </div>
      </div>
    )
  );
};

export default Login;
