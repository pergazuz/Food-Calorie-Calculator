import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CategoryCard = ({ category }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg m-2 max-w-s max-h-50 hover:border-2 hover border-orange-500">
      <img className="h-40 w-30 object-cover" src={category.image} alt={category.name} />
      <div className="px-6 py-4 flex flex-col items-center justify-center">
        <div className="font-bold text-xl mb-2">{category.name}</div>
        <div className="h-6 w-6 rounded-full bg-orange-500 mt-1 flex items-center justify-center drop-shadow-md">
          <FontAwesomeIcon icon={faChevronRight} className="text-white" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
