import { Image } from './Image';

export interface University {
    id: number;
    uniCode: string;
    name: string;
    address: string | null;
    website: string | null;
    description: string | null;
    image: Image | null; // Assuming Image DTO exists
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
