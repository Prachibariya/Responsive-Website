import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onCategoryChange(category._id)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === category._id
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;