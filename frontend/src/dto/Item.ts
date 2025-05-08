import { Image } from './Image';
import { ItemCategory } from './ItemCategory';

export interface Item {
    id: number;
    name: string;
    description: string | null;
    category: ItemCategory; // Assuming ItemCategory DTO will be created
    costPerDay: number | null;
    availability: number | null;
    image: Image | null; // Assuming Image DTO exists
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
