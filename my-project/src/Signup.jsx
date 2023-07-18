import React, { useState } from 'react';
import axios from './axiosConfig';


  
const Signup = ({ showModal, setShowModal, setShowLoginModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    // ...
    try {
        const response = await axios.post('/api/accounts/signup/', {
        email: email,
        password: password,
        });
        if (response.status === 201) {
        alert("Signup successful!");
        setShowModal(false);
        }
    } catch (error) {
        if (error.response.status === 400) {
        alert("Error: " + JSON.stringify(error.response.data));
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
          <h2 className="mb-4 mt-3 text-center text-4xl font-bold">Sign up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 mt-8 w-full mt-5">
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
            <div className="mb-4 w-full">
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-slate-50"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button className="bg-[#F58767] mt-5 w-full hover:bg-[#F36234] drop-shadow-md text-white py-2 px-4 rounded-full font-medium" type="submit">
              Sign up
            </button>
          </form>
          <button
            className="mt-4 text-black text-center w-full"
            onClick={() => {
              setShowModal(false);
              setShowLoginModal(true);
            }}
          >
            Already have an account? <span className="text-[#F58767] font-medium hover:text-[#F36234] ">Sign in</span>
          </button>

        </div>
      </div>
    )
  );
  
};

export default Signup;
