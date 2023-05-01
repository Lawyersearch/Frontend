import { User, UserRole } from "../types/user";
import { emptyUserText } from "../ui/strings";

type NameComponentsKey = "lastName" | "firstName" | "middleName";
type NameComponents = { [Prop in NameComponentsKey]?: boolean };

export const mkUserName = (user?: { [Prop in NameComponentsKey]?: string } | null, include: NameComponents = {}) => {
    if (!user) {
        return emptyUserText;
    }

    const keys: NameComponentsKey[] = ["lastName", "firstName", "middleName"];
    const componentKeys = keys.filter(key => include[key] !== false && user[key]);

    return (
        componentKeys
            .map(componentKey => user[componentKey])
            .join(" ")
            .trim() || emptyUserText
    );
};

export const isUserClient = (role?: UserRole) => role === UserRole.CLIENT;
export const isUserPerformer = (role?: UserRole) => role === UserRole.PERFORMER;
export const isUserModerator = (role?: UserRole) => role === UserRole.MODERATOR;
export const isUserAdmin = (role?: UserRole) => role === UserRole.ADMIN;
