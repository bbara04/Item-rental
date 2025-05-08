import { University } from './University';

export interface Faculty {
    id: number;
    university: University; // Assuming University DTO will be created
    name: string;
    code: string | null;
    description: string | null;
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
