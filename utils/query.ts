import { CategoryTree, CategoryView } from "../types/category";
import { isUndefined } from "lodash";
import { Dialog } from "../types/message";
import { PerformerOrder, ClientOrder, OrderType } from "../types/order";
import { User, UserRole } from "../types/user";
import { isUserPerformer } from "./user";

interface QueryParams<K> {
    defaultValue?: K;
    opts?: RequestInit;
}

function query<T>(url: string): Promise<T | null>;
function query<T>(url: string, { opts }: { opts?: RequestInit }): Promise<T | null>;
function query<T, K>(url: string, { opts, defaultValue }: { opts?: RequestInit; defaultValue: K }): Promise<T | K>;
async function query<T, K = null>(url: string, { defaultValue, opts }: QueryParams<K> = {}) {
    const response = await fetch(process.env.BACK_SERVER_API + url, opts);

    if (!response.ok) {
        return isUndefined(defaultValue) ? null : defaultValue;
    }

    const { data: body } = await response.json();

    return body as T;
}

const createAuthOpts = (token?: string): RequestInit => {
    return token
        ? {
              headers: {
                  Authorization: "Bearer " + token,
              },
          }
        : {};
};

export const queryView = async () => {
    const categories = await query<CategoryTree[], []>("/category", { defaultValue: [] });
    const view: CategoryView[] = [];

    const fillView = (node: CategoryTree, parents: { label: string; id: number }[] = []) => {
        if (node.childs?.length) {
            for (const newNode of node.childs) {
                fillView(newNode, [...parents, { label: node.title, id: node.id }]);
            }
        } else {
            view.push({ label: node.title, parents, id: node.id });
        }
    };

    for (const node of categories) {
        fillView(node);
    }

    return { view, categories };
};

export const queryPublicOrders = (token?: string) =>
    query<PerformerOrder[], []>("/order", { defaultValue: [], opts: createAuthOpts(token) });

export const queryPerformerOrders = (token?: string) =>
    query<PerformerOrder[], []>("/order/performer", { defaultValue: [], opts: createAuthOpts(token) });

export const queryClientOrders = (token?: string) =>
    query<ClientOrder[], []>("/order/user", { defaultValue: [], opts: createAuthOpts(token) });

export const queryPrivateOrders = (role?: UserRole, token?: string) => {
    if (!token) {
        return Promise.resolve([]);
    }

    return isUserPerformer(role) ? queryPerformerOrders(token) : queryClientOrders(token);
};

export const queryOrders = async (role?: UserRole, token?: string) => {
    const [privateOrders, publicOrders] = await Promise.all([
        queryPrivateOrders(role, token),
        queryPublicOrders(token),
    ]);

    return { [OrderType.PRIVATE]: privateOrders, [OrderType.PUBLIC]: publicOrders };
};

export const queryUser = (userId: string) => query<User>(`/user/id/${userId}`);

export const querySelf = async (token?: string) => query<User>("/user/myself", { opts: createAuthOpts(token) });

export const queryDialogs = async (token?: string) =>
    query<Dialog[], []>("/message", { opts: createAuthOpts(token), defaultValue: [] });
