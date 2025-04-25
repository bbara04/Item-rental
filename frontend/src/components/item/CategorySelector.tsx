import React from "react";

type CategorySelectorProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, setSelectedCategory }) => (
  <div className="mb-4 flex justify-center gap-2 flex-wrap">
    <button
      className={`px-4 py-2 rounded border ${selectedCategory === '' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border-gray-300'}`}
      onClick={() => setSelectedCategory('')}
    >
      All
    </button>
    {categories.map((cat) => (
      <button
        key={cat}
        className={`px-4 py-2 rounded border ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border-gray-300'}`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategorySelector;
