import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.png';

const NavBar = ({ setShowLoginModal, setShowSignupModal }) => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-6 mt-8 font-custom">
      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-0">
        <NavLink 
          to="/" 
        >
          <img src={logo} alt="logo" className="font-semibold text-2xl text-[#F36234] tracking-tight lg:mr-14 ml-4 lg:ml-20"/>
        </NavLink>  
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-lg lg:text-2xl flex flex-col lg:flex-row mt-4 lg:mt-0 font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#F36234] lg:ml-[70px]"
                : "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#7A7A7A] hover:text-[#F36234] lg:ml-[70px] "
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/FoodItemList" 
            className={({ isActive }) => 
              isActive 
                ? "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#F36234] lg:ml-[70px]"
                : "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#7A7A7A] hover:text-[#F36234] lg:ml-[70px]"
            }
          >
            Menu
          </NavLink>
          <NavLink 
            to="/bmi-calculator" 
            className={({ isActive }) => 
              isActive 
                ? "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#F36234] lg:ml-[70px]"
                : "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#7A7A7A] hover:text-[#F36234] lg:ml-[70px]"
            }
          >
            Service
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => 
              isActive 
                ? "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#F36234] lg:ml-[70px]"
                : "mb-2 lg:mb-0 lg:inline-block lg:mt-0 text-[#7A7A7A] hover:text-[#F36234] lg:ml-[70px]"
            }
          >
            History
          </NavLink>
          <FontAwesomeIcon icon={faSearch} className="ml-4 lg:ml-14 text-[#7A7A7A]"  />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2 font-normal mt-4 lg:mt-0 lg:mr-20">
        <button className="border-2 border-[#F36234] text-[#F36234] text-s rounded-full py-3 px-7  mr-0 lg:mr-2 hover:text-white hover:bg-[#F36234]" onClick={() => setShowLoginModal(true)}>
          <FontAwesomeIcon icon={faRightToBracket} className= "mr-4"/>
          Sign in
        </button>
        <button className="bg-[#F36234] text-white text-s rounded-full border-2 border-[#F36234] py-3 px-7 drop-shadow-lg hover:text-[#F36234] hover:bg-white " onClick={() => setShowSignupModal(true)}>
          <FontAwesomeIcon icon={faUserPlus} className= "mr-4"/>
          Sign up
        </button>
      </div>
    </nav>
  )
}

export default NavBar;
