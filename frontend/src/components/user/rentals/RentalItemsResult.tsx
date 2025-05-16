import React from "react";
import { Item } from "../../../client";
import RentalItemCard from "./RentalItemCard";

type RentalItemsResultProps = {
  items: Item[];
};

const RentalItemsResult: React.FC<RentalItemsResultProps> = ({ items }) => (
  <div className="flex flex-wrap gap-6 justify-center">
    {items.map((item) => (
      <RentalItemCard key={item.id} {...item} />
    ))}
  </div>
);

export default RentalItemsResult;
