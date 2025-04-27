import React from "react";
import { PreviewRentalItem } from "../../dto/PreviewRentalItem";
import RentalItemCard from "./RentalItemCard";

type RentalItemsResultProps = {
  items: PreviewRentalItem[];
};

const RentalItemsResult: React.FC<RentalItemsResultProps> = ({ items }) => (
  <div className="flex flex-wrap gap-6 justify-center">
    {items.map((item) => (
      <RentalItemCard key={item.id} {...item} />
    ))}
  </div>
);

export default RentalItemsResult;
