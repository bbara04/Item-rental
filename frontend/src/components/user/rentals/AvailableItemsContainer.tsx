import { useEffect, useState } from "react";
import { getAllItems, GetAllItemsResponse } from "../../../client";
import CategorySelector from "./CategorySelector";
import RentalItemSearch from "./RentalItemSearch";
import RentalItemsResult from "./RentalItemsResult";

const AvailableItemsContainer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [items, setItems] = useState<GetAllItemsResponse>();

    useEffect(() => {
        async function fetchData() {
            const {data, error} = await getAllItems();
            if (error) {
                console.error("Error fetching items:", error);
            }
            setItems(data);
        }
        fetchData();
    }, []);

    if (!items) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl text-gray-600">Loading items...</div>
            </div>
        );
    }

    const categories = Array.from(new Set(items.map(item => item.categories).flat().filter((category): category is string => category !== undefined)));
    const filteredItems = items.filter(
        (item) =>
            (selectedCategory === "" || item.categories?.includes(selectedCategory)) &&
            (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return (
        <div className="p-4">
            <RentalItemSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategorySelector categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <RentalItemsResult items={filteredItems} />
        </div>
    );
};

export default AvailableItemsContainer;
