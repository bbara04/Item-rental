import React from "react";

type RentalItemSearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const RentalItemSearch: React.FC<RentalItemSearchProps> = ({ searchQuery, setSearchQuery }) => (
  <div className="mb-4 flex justify-center">
    <input
      type="text"
      placeholder="Search items..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 border border-gray-300 rounded w-full max-w-md"
    />
  </div>
);

export default RentalItemSearch;
