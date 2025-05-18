import React from "react";
import { useAppContext } from "../../../AppContextProvider";

type CategorySelectorProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  const { baseColor } = useAppContext();
  const activeStyle = { '--user-bg-color': baseColor } as React.CSSProperties;

  return (
    <div className="mb-4 flex justify-center gap-2 flex-wrap">
      <button
        className={`px-4 py-2 rounded border ${selectedCategory === '' ? `bg-[var(--user-bg-color)] text-white` : 'bg-white text-gray-800 border-gray-300'}`}
        style={selectedCategory === '' ? activeStyle : {}}
        onClick={() => setSelectedCategory('')}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded border ${selectedCategory === cat ? `bg-[var(--user-bg-color)] text-white` : 'bg-white text-gray-800 border-gray-300'}`}
          style={selectedCategory === cat ? activeStyle : {}}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
