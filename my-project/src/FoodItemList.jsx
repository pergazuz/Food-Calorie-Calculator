import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SelectedFoodItem from './SelectedFoodItem';
import { AiOutlineSearch } from 'react-icons/ai'; 
import FoodReport from './FoodReport';
import ItemSettingsModal from './ItemSettingsModal'; // Import the new modal component
import CategoryCard from './CategoryCard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './NavBar'; // Import NavBar
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const prepareNamesUnits = (selectedItems) => {
  return selectedItems
    .map((item) => `${encodeURIComponent(item.name)},${encodeURIComponent(item.unit)},${encodeURIComponent(item.numPieces)}`)
    .join(';');
};


const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [reportData, setReportData] = useState([]);
  
  // Add a new state for the report table visibility
  const [showReport, setShowReport] = useState(false);

  // Calculate the sum of energy, protein, and fat
  const totalEnergy = reportData.reduce((acc, item) => acc + item.energy, 0);
  const totalProtein = reportData.reduce((acc, item) => acc + item.protein, 0);
  const totalFat = reportData.reduce((acc, item) => acc + item.fat, 0);
  const totalCholesterol = reportData.reduce((acc, item) => acc + item.cholesterol, 0);
  const totalSugar = reportData.reduce((acc, item) => acc + item.sugar, 0);
  const totalFiber = reportData.reduce((acc, item) => acc + item.fiebr, 0);
  const totalVitamin_a = reportData.reduce((acc, item) => acc + item.vitamin_a, 0);
  const totalVitamin_b1 = reportData.reduce((acc, item) => acc + item.vitamin_b1, 0);
  const totalVitamin_b2 = reportData.reduce((acc, item) => acc + item.vitamin_b2, 0);
  const totalVitamin_c = reportData.reduce((acc, item) => acc + item.vitamin_c, 0);
  const totalCalcium = reportData.reduce((acc, item) => acc + item.calcium, 0);
  const totalIron = reportData.reduce((acc, item) => acc + item.iron, 0);
  const totalSodium = reportData.reduce((acc, item) => acc + item.sodium, 0);
  const totalPotassium = reportData.reduce((acc, item) => acc + item.potassium, 0);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const removeItem = (foodItemToRemove) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((foodItem) => foodItem !== foodItemToRemove)
    );
  };

  
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/raw-food-items/?name=${encodeURIComponent(
          name
        )}&search=${encodeURIComponent(search)}`
      )
      .then((response) => {
        setFoodItems(response.data);
      });
  }, [name, search]);


  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  
  const addItem = (foodItem, event) => {
    const button = event.currentTarget;
    button.classList.add("animate");
  
    setTimeout(() => {
      button.classList.remove("animate");
      setSelectedFoodItem({
        ...foodItem,
        unit: foodItem.unit || "", // Add the default unit
        numPieces: 1, // Add the default numPieces
      });
      setShowSettingsModal(true); // Show the settings modal after adding the item
    }, 300);
  };
  
  const handleCloseSettingsModal = (updatedFoodItem) => {
    if (updatedFoodItem) {
      setSelectedItems((prevItems) => {
        // Check if the food item already exists in the selected items list
        const itemIndex = prevItems.findIndex(
          (item) => item.name === updatedFoodItem.name
        );
  
        // If the food item already exists, update it, otherwise add it to the list
        if (itemIndex !== -1) {
          return prevItems.map((item) =>
            item.name === updatedFoodItem.name ? updatedFoodItem : item
          );
        } else {
          return [...prevItems, updatedFoodItem];
        }
      });
    }
    setShowSettingsModal(false);
  };
  
  const navigate = useNavigate(); // Use the useNavigate hook
  
  const getReport = () => {
    const names_units = prepareNamesUnits(selectedItems);

    axios
      .get(`http://localhost:8000/api/food-items-report/?names_units=${names_units}`)
      .then((response) => {
        // Pass report data as state and navigate to report page
        navigate('/report', { state: { reportData: response.data } });
      });
  };

  const updateItem = (updatedFoodItem) => {
    setSelectedItems((prevItems) =>
      prevItems.map((foodItem) =>
        foodItem.name === updatedFoodItem.name ? updatedFoodItem : foodItem
      )
    );
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const categories = [
    { name: 'ขนม', image: 'https://th.hellomagazine.com/wp-content/uploads/cache/2020/04/92266623_316412112658751_6109252347909152312_n/714229924.jpg' },
    { name: 'ข้าว เส้น', image: 'https://f.ptcdn.info/624/030/000/1429765739-naibanncom-o.jpg' },
    { name: 'ต้ม แกง', image: 'https://www.sgethai.com/wp-content/uploads/2022/09/8-25.jpg' },
    { name: 'ยํา ลาบ', image: 'https://numsups.com/wp-content/uploads/2020/12/c1d9e57195cf4a7f897f93f2921a8e46-1024x683.jpg' },
    { name: 'ผลไม้', image: 'https://eatwellconcept.com/wp-content/uploads/2020/03/assorted-mixed-fruits_74190-6961.jpg' },
    { name: 'นมและผลิตภัณฑ์นม', image: 'https://static.hd.co.th/system/blog_articles/main_hero_images/000/004/572/original/iStock-854296650_%281%29.jpg' },
    { name: 'น้ำพริก น้ำจิ้ม', image: 'https://www.matichonacademy.com/wp-content/uploads/2020/02/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%81%E0%B8%B0%E0%B8%9B%E0%B8%B4.jpg' },

    // Add more categories here...
  ];

  
  
  return (
    <div>
      <NavBar 
        setShowLoginModal={setShowLoginModal} 
        setShowSignupModal={setShowSignupModal} 
      />
     
     <div className="container mx-auto px-4 py-6 flex">

      <div className="content flex-grow ml-[100px]"> 
      
  <div className="flex justify-between items-center">
  <div>
      <h1 className="text-4xl font-bold mb-6 pt-3 drop-shadow-lg">Hi, Tongfah 😋</h1>

      <div className="w-1/4 flex items-center mb-4 mt-4  rounded-[18px] drop-shadow-lg relative">
  <div className="relative w-full">
    <AiOutlineSearch className="absolute top-3 left-3 text-gray-500" size={19} />
    <input
      type="search"
      value={search}
      placeholder="Search by food name"
      onChange={handleSearchChange}
      className={`pl-9 px-2 py-2 w-full focus:outline-none
        ${foodItems.length > 0 ? 'rounded-t-[18px]' : 'rounded-full'}`}
    />
    {foodItems.length > 0 && (
      <div className="result-container absolute z-10 bg-white rounded-b-[18px] py-2 w-full left-0 right-0">
        {foodItems.slice(0, 6).map((foodItem) => (
          <div className="hover:bg-gray-100">
            <div key={foodItem.id} className="flex items-center py-2 cursor-pointer ml-10" onClick={(event) => addItem(foodItem, event)}>
              <AiOutlineSearch className="absolute left-3 text-gray-500" size={19} />
              <span>{foodItem.name}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>    

      <p className="text-xl mb-6 font-semibold">Menu Category</p>
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
      </div>
      {showReport && (
        <FoodReport
          reportData={reportData}
          totalEnergy={totalEnergy}
          totalProtein={totalProtein}
          totalFat={totalFat}
          totalCholesterol={totalCholesterol}
          totalSugar={totalSugar}
          totalFiber={totalFiber}
          totalVitamin_a={totalVitamin_a}
          totalVitamin_b1={totalVitamin_b1}
          totalVitamin_b2={totalVitamin_b2}
          totalVitamin_c={totalVitamin_c}
          totalCalcium={totalCalcium}
          totalIron={totalIron}
          totalSodium={totalSodium}
          totalPotassium={totalPotassium}
        />
      )}

      {showSettingsModal && selectedFoodItem && (
        <ItemSettingsModal
          foodItem={selectedFoodItem}
          onUpdate={updateItem}
          onClose={handleCloseSettingsModal}
        />
      )}
     </div>


     <div className="sidebar w-96 bg-gray-100 ml-20 mr-20 rounded-lg p-4 flex flex-col  items-center">
     {selectedItems.length > 0 && (
   <>
    <h2 className="text-2xl font-bold mt-6 mb-4">Selected Items:</h2>
        {selectedItems.map((item, index) => (
          <SelectedFoodItem
            key={index}
            foodItem={item}
            onRemove={removeItem}
            onUpdate={updateItem}
          />
        ))}
    </>
   )}
    <button
            onClick={getReport}
            disabled={selectedItems.length === 0 || !selectedItems.every((item) => item.unit)}
            className={`bg-orange-500 text-white px-4 py-2 drop-shadow-md rounded mt-4 mr-2 ${
              selectedItems.length === 0 || !selectedItems.every((item) => item.unit)
                ? 'opacity-0 cursor-not-allowed '
                : 'hover:bg-orange-600'
            }`}
          >
            Get Report
          </button>
      </div>

    </div>

    </div>
    
  );
};

export default FoodItemList;