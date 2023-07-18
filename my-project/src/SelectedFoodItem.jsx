import React from 'react';
import './App.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectedFoodItem = ({ foodItem, onRemove }) => {

  const handleRemove = () => {
    onRemove(foodItem);
  };

  return (
    <div className="flex justify-start items-start">
      <div className="m-2 p-4 bg-white drop-shadow-xl rounded-xl flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{foodItem.name}</h3>
          <p><strong>หน่วย: </strong>{foodItem.unit}</p>
          <p><strong>จํานวน: </strong>{foodItem.numPieces}</p>
        </div>
        <div className="self-end mt-2">
          <button
            onClick={handleRemove}
            className="bg-orange-500 drop-shadow-md rounded-full text-white px-2 py-1 hover:bg-orange-600"
          >
           <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedFoodItem;
