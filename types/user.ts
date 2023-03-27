import { Category } from "./category";

export interface Review {
    id: string;
    avatar: string;
    name: string;
    comment: string;
    date: string;
    rating: number;
    userFromId: string;
    userToId: string;
}

export interface Education {
    id: string;
    studyPlace: string;
    direction: string;
    startYear: string;
    endYear: string;
    duration: number;
}

export interface WorkExpirience {
    id: string;
    position: string;
    startYear: string;
    endYear: string;
    workPlace: string;
    duration: number;
}

export enum UserRole {
    CLIENT = 0,
    PERFORMER = 1,
    MODERATOR = 2,
    ADMIN = 3,
}

export interface UserShort {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    description: string;
    avatar: string;
}

export interface User extends UserShort {
    isChecked: boolean;
    role: UserRole;
    registrationDate: string;
    rating: number;
    phone?: string;
    instagram?: string;
    email?: string;
    categories: Category[];
    expirience: number;
    educations: Education[];
    workExpiriences: WorkExpirience[];
    reviewCount: number;
    reviewsFrom: Review[];
    reviewsTo: Review[];
}
