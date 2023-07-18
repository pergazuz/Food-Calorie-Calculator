import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import food_bg from './images/food_bg.png';
import circle_bg from './images/circle_bg.png';
import logo from './images/logo.png';

import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar'; // Import NavBar

import {
  faSearch,
  faRightToBracket,
  faUserPlus,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
      <NavBar 
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />

      <div className="flex items-center justify-between mt-4 p-10">
        {/* Text on the left */}
        <div className="w-1/2">
          <h2 className="text-7xl font-semibold mb-6 ml-20 mt-[-180px]">Calorie Counter <br></br><span className="text-6xl font-normal mb-6">Your Daily Foods</span></h2>
          <p className="text-lg font-semibold text-[#A4A4A4] ml-20 mt-2">Unlock Your Optimal Health with Calorie Counter:<br></br> Track, Monitor, and Succeed on Your Journey.</p>
          <input
              type="text"
              className="pl-9 rounded-md w-1/2 ml-20 mt-20 border-4 border border-[#F36234] px-2 py-2  focus:outline-none "
            />
            <button className="ml-1 bg-[#F36234] border-2 border-[#F36234] text-white text-m rounded-md py-3 px-4 drop-shadow-lg hover:text-[#F36234] hover:bg-white hover:border-2 ">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-4"/>
             Search now
            </button>
        </div>

        {/* Image on the right */}
        <div className="w-1/2">
          <img src={food_bg} alt="Food" />
        </div>
      </div>
      <Signup
          showModal={showSignupModal}
          setShowModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
        />
        <Login
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
  
    </div>
  );
}

export default LandingPage;
