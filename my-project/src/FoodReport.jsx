import React, { useState, useEffect } from 'react';

const FoodReport = ({ reportData }) => {
  const [showMore, setShowMore] = useState([]);
  const [showTotalMore, setShowTotalMore] = useState(false);

  useEffect(() => {
    setShowMore(new Array(reportData.length).fill(false));
  }, [reportData]);

  const displayNumber = (value) => {
    return (typeof value === "number") ? value.toFixed(2) : "N/A";
  }

  const toggleShowMore = (index) => {
    const newShowMore = [...showMore];
    newShowMore[index] = !newShowMore[index];
    setShowMore(newShowMore);
  }

  const totalNutrients = reportData.reduce((total, item) => {
    Object.keys(item).forEach((key) => {
      if (typeof item[key] === "number") {
        total[key] = (total[key] || 0) + item[key];
      }
    });
    return total;
  }, {});

  return (
    <div>
      <h2 className="text-3xl text-orange-500 font-bold mt-6 mb-4 mb-4 text-center">Report</h2>
      <div className="flex flex-wrap justify-start items-start">
        {reportData.map((item, index) => (
          <div key={index} className="border-2 border-gray-300 m-2 p-4 rounded-xl flex flex-col">
          <div>
            <h3 className="text-xl font-bold mb-2 text-center">{item.name}</h3>
            <p><strong>Unit: </strong>{item.unit}</p>
            <p><strong>Value: </strong>{item.value}</p>
            <p><strong>Energy: </strong>{item.energy}</p>
            <p><strong>Protein: </strong>{displayNumber(item.protein)}</p>
            <p><strong>Fat: </strong>{displayNumber(item.fat)}</p>
            {showMore[index] && <>
              <p><strong>Cholesterol: </strong>{displayNumber(item.cholesterol)}</p>
              <p><strong>Sugar: </strong>{displayNumber(item.sugar)}</p>
              <p><strong>Fiber: </strong>{displayNumber(item.fiebr)}</p>
              <p><strong>Vitamin A: </strong>{displayNumber(item.vitamin_a)}</p>
              <p><strong>Vitamin B1: </strong>{displayNumber(item.vitamin_b1)}</p>
              <p><strong>Vitamin B2: </strong>{displayNumber(item.vitamin_b2)}</p>
              <p><strong>Vitamin C: </strong>{displayNumber(item.vitamin_c)}</p>
              <p><strong>Calcium: </strong>{displayNumber(item.calcium)}</p>
              <p><strong>Iron: </strong>{displayNumber(item.iron)}</p>
              <p><strong>Sodium: </strong>{displayNumber(item.sodium)}</p>
              <p><strong>Potassium: </strong>{displayNumber(item.potassium)}</p>
            </>}
          </div>
          <button 
            className="py-2 px-4 text-stone-600 rounded mb-1 mt-auto self-end" 
            onClick={() => toggleShowMore(index)}>
            {showMore[index] ? 'See Less' : 'See More'}
          </button>
        </div>
        ))}

        <div className="border-2 border-gray-300 m-2 p-4 rounded-xl flex flex-col">
          <div>
            <h3 className="text-xl font-bold mb-2">Total Nutrients</h3>
            <p><strong>Energy: </strong>{displayNumber(totalNutrients.energy)}</p>
            <p><strong>Protein: </strong>{displayNumber(totalNutrients.protein)}</p>
            <p><strong>Fat: </strong>{displayNumber(totalNutrients.fat)}</p>
            {showTotalMore && <>
              <p><strong>Cholesterol: </strong>{displayNumber(totalNutrients.cholesterol)}</p>
              <p><strong>Sugar: </strong>{displayNumber(totalNutrients.sugar)}</p>
              <p><strong>Fiber: </strong>{displayNumber(totalNutrients.fiebr)}</p>
              <p><strong>Vitamin A: </strong>{displayNumber(totalNutrients.vitamin_a)}</p>
              <p><strong>Vitamin B1: </strong>{displayNumber(totalNutrients.vitamin_b1)}</p>
              <p><strong>Vitamin B2: </strong>{displayNumber(totalNutrients.vitamin_b2)}</p>
              <p><strong>Vitamin C: </strong>{displayNumber(totalNutrients.vitamin_c)}</p>
              <p><strong>Calcium: </strong>{displayNumber(totalNutrients.calcium)}</p>
              <p><strong>Iron: </strong>{displayNumber(totalNutrients.iron)}</p>
              <p><strong>Sodium: </strong>{displayNumber(totalNutrients.sodium)}</p>
              <p><strong>Potassium: </strong>{displayNumber(totalNutrients.potassium)}</p>
            </>}
          </div>
          <button 
            className="py-2 px-4 text-stone-600 rounded mb-1 mt-auto self-end" 
            onClick={() => setShowTotalMore(!showTotalMore)}>
            {showTotalMore ? 'See Less' : 'See More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodReport