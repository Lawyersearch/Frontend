import { User, UserRole } from "../types/user";
import { emptyUserText } from "../ui/strings";

export const mkCreatorName = (user?: User | null) =>
    (user && [user.lastName, user.firstName].filter(Boolean).join(" ")) || emptyUserText;

export const isUserClient = (role?: UserRole) => role === UserRole.CLIENT;
export const isUserPerformer = (role?: UserRole) => role === UserRole.PERFORMER;
export const isUserModerator = (role?: UserRole) => role === UserRole.MODERATOR;
export const isUserAdmin = (role?: UserRole) => role === UserRole.ADMIN;
