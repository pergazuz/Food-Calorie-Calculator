import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemSettingsModal = ({ foodItem, onUpdate, onClose }) => {
  const [selectedUnit, setSelectedUnit] = useState(foodItem.unit || "");
  const [measurementUnits, setMeasurementUnits] = useState([]);
  const [numPieces, setNumPieces] = useState(foodItem.numPieces || 1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/food-item-measurement-units/${encodeURIComponent(foodItem.name)}/`)
      .then((response) => {
        setMeasurementUnits(response.data);
      });
  }, [foodItem]);

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleNumPiecesChange = (event) => {
    setNumPieces(event.target.value);
  };

  const handleSave = () => {
    onUpdate({ ...foodItem, unit: selectedUnit, numPieces });
    onClose({ ...foodItem, unit: selectedUnit, numPieces: parseInt(numPieces, 10) });
  };
  
  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-xl shadow-lg w-1/2 p-10 sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <h3 className="mb-4 mt-3 text-center text-3xl font-bold">
            {foodItem.name}
          </h3>
          <div className="mt-8 w-full">
            <label htmlFor="unit" className="font-medium">Unit:</label>
            <select
              value={selectedUnit}
              onChange={handleUnitChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-slate-50"
            >
              <option value="" disabled>-- Select --</option>
              {measurementUnits.map((unit, index) => (
                <option key={index} value={unit.unit}>
                  {unit.unit}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 w-full">
            <label htmlFor="numPieces" className="font-medium">Number of Pieces:</label>
            <select
              value={numPieces}
              onChange={handleNumPiecesChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-slate-50 mt-2"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            className={`bg-[#F58767] hover:bg-[#F36234] drop-shadow-md text-white py-2 px-4 rounded-full font-medium ${!selectedUnit || numPieces <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSave}
            disabled={!selectedUnit || numPieces <= 0}
          >
            Save
          </button>

            <button
              type="button"
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-full font-medium"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSettingsModal;
     
