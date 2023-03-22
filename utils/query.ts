import { CategoryTree, CategoryView } from "../types/category";

export const queryView = async () => {
    const query = await fetch(`${process.env.BACK_SERVER_API}/category`).then(res => res.json());
    const categories = query.data;
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

    for (const node of query?.data ?? []) {
        fillView(node);
    }

    return {view, categories};
}
