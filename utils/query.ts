import { CategoryTree, CategoryView } from "../types/category";
import { Order } from "../types/order";
import { User } from "../types/user";

const query = async <T>(url: string, opts?: RequestInit) => {
    const response = await fetch(process.env.BACK_SERVER_API + url, opts);

    if (!response.ok) {
        return;
    }

    const {data: body} = await response.json();

    return body as T;
}

const createAuthOpts = (token?: string): RequestInit => {
    return token
        ? {
            headers: {
                Authorization: "Bearer " + token
            }
        }: {};
};

export const queryView = async () => {
    const categories = await query<CategoryTree[]>("/category");
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

    for (const node of categories ?? []) {
        fillView(node);
    }

    return {view, categories};
}

export const queryPublicOrders = () => query<Order[]>("/order");

export const queryPrivateOrders = (token?: string) => query<Order[]>("/order/performer", createAuthOpts(token));

export const queryUserOrders = (token?: string) => query<Order[]>("/order/user", createAuthOpts(token));

export const queryUser = (userId: string) => query<User>(`/user/id/${userId}`);

export const querySelf = async (token?: string) => query<User>("/user/myself", createAuthOpts(token));
