import { useState } from "react";
import { ExampleData } from "../../../dto/ExampleData";
import CategorySelector from "./CategorySelector";
import RentalItemSearch from "./RentalItemSearch";
import RentalItemsResult from "./RentalItemsResult";

const AvailableItemsContainer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const categories = Array.from(new Set(ExampleData.exampleRentalItems.map(item => item.category)));
    const filteredItems = ExampleData.exampleRentalItems.filter(
        (item) =>
            (selectedCategory === "" || item.category === selectedCategory) &&
            (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return (
        <div className="p-4">
            <CategorySelector categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <RentalItemSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <RentalItemsResult items={filteredItems} />
        </div>
    );
};

export default AvailableItemsContainer;
