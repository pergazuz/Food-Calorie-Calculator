import React, { useState } from 'react';
import ItemSettingsModal from './ItemSettingsModal'; // Import the new modal component
import NavBar from './NavBar'; // Import NavBar




const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('male');
  const [bmi, setBmi] = useState(null);

  const [showResult, setShowResult] = useState(false);


  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI.toFixed(2));
    setShowResult(true);
  };


  const interpretBMI = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal';
    if (bmi >= 24.9 && bmi < 29.9) return 'Overweight';
    if (bmi >= 29.9 && bmi < 35) return 'Obese';
    if (bmi >= 35) return 'Extremely Obese';
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


  const [bee, setBee] = useState(null);

  const calculateBEE = () => {
    let calculatedBEE;
    if (sex === 'male') {
      calculatedBEE = 66.5 + (13.8 * weight) + (5 * height) - (6.8 * age);
    } else {
      calculatedBEE = 665.1 + (9.1 * weight) + (1.8 * height) - (4.7 * age);
    }
    setBee(calculatedBEE.toFixed(2));
  };

  const calculateBMIAndBEE = () => {
    calculateBMI();
    calculateBEE();
  };

  return (
    
    <div>
      <NavBar 
        setShowLoginModal={setShowLoginModal} 
        setShowSignupModal={setShowSignupModal} 
      />
    <div className="container mx-auto px-4 py-6 mt-8 w-3/6 drop-shadow-xl">
      <div className="bg-white rounded-lg shadow p-6 bg-opacity-90  border-2 border-[#F36234]">
      <h2 className="text-3xl font-bold mb-6 text-center  pt-4 pb-5">BMI and BEE Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height (cm)"
            className="rounded border border-gray-300 px-2 py-1 w-full"
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            className="rounded border border-gray-300 px-2 py-1 w-full"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="rounded border border-gray-300 px-2 py-1 w-full "
          />
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex justify-center">
        <button
            onClick={calculateBMIAndBEE}
            className="bg-[#F36234] border-2 text-white drop-shadow-md px-4 py-1 mt-5 rounded hover:text-[#F36234] hover:bg-white hover:border-2  hover:border-[#F36234]"
          >
            Calculate
          </button>

        </div>
        
      </div>
      {showResult && (
        <div className="container mx-auto px-4 py-6 w-3/6 drop-shadow-xl ">
          <div className="bg-white rounded-lg shadow p-6 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-center pt-2 pb-3">
              BMI Result
            </h2>
            <div className="text-xl font-semibold mt-3">
              Your BMI is: <span className="text-[#F36234]">{bmi}</span>
              <br></br>
              You are currently:{" "}
              <span className="text-[#F36234]">{interpretBMI(bmi)}</span>
              <br></br>
            </div>
          </div>
        </div>
      )}
      {showResult && (
        <div className="container mx-auto px-4 py-6 w-3/6 drop-shadow-xl">
          <div className="bg-white rounded-lg shadow p-6 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-center pt-2 pb-3">
              BEE Result
            </h2>
            <div className="text-xl font-semibold mt-3">
              Your Basal Energy Expenditure is: <span className="text-[#F36234]">{bee}</span> calories/day
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default BMICalculator;
