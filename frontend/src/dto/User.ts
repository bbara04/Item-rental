import { Balance } from './Balance';
import { Faculty } from './Faculty';
import { Image } from './Image';
import { University } from './University';

// Renamed from User to AppUser to avoid conflict with existing User DTO
export interface User {
    id: number;
    balance: Balance; // Assuming Balance DTO exists
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    // passwordHash is likely sensitive and shouldn't be in a DTO
    loginType: string;
    role: string;
    university: University; // Assuming University DTO exists
    faculty: Faculty; // Assuming Faculty DTO exists
    image: Image | null; // Assuming Image DTO exists
    ratings: number | null;
    description: string | null;
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
