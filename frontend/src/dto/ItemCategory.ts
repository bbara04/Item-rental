import { Image } from './Image';

export interface ItemCategory {
    id: number;
    description: string | null;
    parentCategory: ItemCategory | null; // Self-referencing
    childCategories: ItemCategory[];
    image: Image | null; // Assuming Image DTO exists
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
