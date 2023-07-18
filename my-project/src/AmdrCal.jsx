import React, { useState } from 'react';
import NavBar from './NavBar';
import ResultsAmdrCal from './ResultsAmdrCal';

const AmdrCal = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [formData, setFormData] = useState({
    meat: {
      lowermeat: 0,
      lowmeat: 0,
      midmeat: 0,
      hightmeat: 0
    },
    milk: {
      highmilk: 0,
      midmilk: 0,
      lowmilk: 0
    },
    vetgetable: {
      vetgetable1: 0,
      vetgetable2: 0
    },
    flour: {
      flour: 0
    },
    oil: {
      oil: 0
    },
    fruit: {
      fruit: 0
    },
    others: {
      energy: 0,
      protein: 0
    }
  });

  const [reportData, setReportData] = useState({
    protein_intake: 0, 
    carb_intake: 0, 
    lipid_intake: 0, 
    cal_intake: 0
  });

  const [currentCategory, setCurrentCategory] = useState(0);
  const categories = Object.keys(formData);

  const [viewResults, setViewResults] = useState(false);

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    }
  };

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [categories[currentCategory]]: {
        ...formData[categories[currentCategory]],
        [event.target.name]: event.target.value ? Number(event.target.value) : null
      }
    });
  };

  const calculateAMDR = () => {
    const { highmilk, midmilk, lowmilk } = formData.milk;
    const { vetgetable1, vetgetable2 } = formData.vetgetable;
    const { fruit } = formData.fruit;
    const { flour } = formData.flour;
    const { lowermeat, lowmeat, midmeat, hightmeat } = formData.meat;
    const { oil } = formData.oil;
    const { energy, protein } = formData.others;
  
    // calculate nutrient intake
    const carb_milk = 12 * (highmilk + midmilk + lowmilk);
    const pro_milk = 8 * (highmilk + midmilk + lowmilk);
    const lip_milk = (8*highmilk)+(5*midmilk);
    const ener_milk = (4*(carb_milk+pro_milk))+(9*lip_milk);
  
    const carb_vet = 5*vetgetable2;
    const pro_vet = 2*vetgetable2;
    const ener_vet = 4*(carb_vet+pro_vet);
  
    const carb_fruit = 15*fruit;
    const ener_fruit = 4*carb_fruit;
  
    const carb_flour = 18*flour;
    const pro_flour = 2*flour;
    const ener_flour = 4*(carb_flour+pro_flour);
  
    const pro_meat = 7*(lowermeat+lowmeat+midmeat+hightmeat);
    const lid_meat = (1*lowermeat)+(3*lowmeat)+(5*midmeat)+(8*hightmeat);
    const ener_meat = (4*pro_meat)+(9*lid_meat);
  
    const lid_oil = 5*oil;
    const ener_oil = 9*lid_oil;
  
    const protein_intake = pro_milk + pro_meat + pro_flour + pro_vet + protein;
    const carb_intake = carb_milk + carb_flour + carb_fruit + carb_vet;
    const lipid_intake = lid_meat + lip_milk + lid_oil;
    const cal_intake = ener_flour + ener_fruit + ener_meat + ener_milk + ener_oil + ener_vet + energy;
  
    setReportData({
      protein_intake, 
      carb_intake, 
      lipid_intake, 
      cal_intake
    });

    setViewResults(true);
  };

  const ResultsView = () => (
    <div className="bg-white rounded-lg shadow p-6 bg-opacity-90 border-2 border-[#F36234]">
      <h2 className="text-3xl font-bold mb-6 text-center pt-4 pb-5">AMDR Results</h2>
      <p>Protein Intake: {reportData.protein_intake}</p>
      <p>Carb Intake: {reportData.carb_intake}</p>
      <p>Lipid Intake: {reportData.lipid_intake}</p>
      <p>Calorie Intake: {reportData.cal_intake}</p>
    </div>
  );

  return (
    <div>
      <NavBar setShowLoginModal={setShowLoginModal} setShowSignupModal={setShowSignupModal} />
      <div className="flex">
        <div className="container mx-auto px-4 py-6 w-3/6 drop-shadow-xl">
          {!viewResults && (
            <div className="bg-white rounded-lg shadow p-6 bg-opacity-90 border-2 border-[#F36234]">
              <h2 className="text-3xl font-bold mb-6 text-center pt-4 pb-5">AMDR Calculate</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {Object.keys(formData[categories[currentCategory]]).map((item, index) => (
                    <div key={index}>
                      <label className="block mb-1 font-bold text-lg">{item.charAt(0).toUpperCase() + item.slice(1)}</label>
                      <input 
                        type="number min=0" 
                        name={item} 
                        onChange={handleInputChange} 
                        value={formData[categories[currentCategory]][item]}
                        className="rounded border border-gray-300 px-2 py-1 w-full"
                      />
                    </div>
                  ))}
                </div>
              </form>
              <div className="flex justify-between items-center mt-6">
                <div>
                  {currentCategory !== 0 && (
                    <button 
                      type="button" 
                      onClick={handleBack} 
                      className="bg-[#F36234] border-2 text-white drop-shadow-md px-4 py-1 rounded hover:text-[#F36234] hover:bg-white hover:border-2  hover:border-[#F36234]"
                    >
                      Back
                    </button>
                  )}
                </div>
                <div>
                  {currentCategory === categories.length - 1 ? (
                    <button 
                      type="button" 
                      onClick={calculateAMDR} 
                      className="bg-[#F36234] border-2 text-white drop-shadow-md px-4 py-1 rounded hover:text-[#F36234] hover:bg-white hover:border-2 hover:border-[#F36234]"
                    >
                      Calculate AMDR
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="bg-[#F36234] border-2 text-white drop-shadow-md px-4 py-1 rounded hover:text-[#F36234] hover:bg-white hover:border-2 hover:border-[#F36234]"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {viewResults && <ResultsAmdrCal reportData={reportData} />}
        </div>
      </div>
    </div>
  );
};

export default AmdrCal;
