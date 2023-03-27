import { UserRole } from "../types/user";

export const isUserClient = (role?: UserRole) => role === UserRole.CLIENT;
export const isUserPerformer = (role?: UserRole) => role === UserRole.PERFORMER;
export const isUserModerator = (role?: UserRole) => role === UserRole.MODERATOR;
export const isUserAdmin = (role?: UserRole) => role === UserRole.ADMIN;
