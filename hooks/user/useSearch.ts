import { CategoryView } from "../../types/category";
import { useAppDispatch } from "../redux/useTypedRedux";
import { useCallback, useEffect, useRef } from "react";
import { useLazyGetUsersByCategorIdQuery } from "../../services/user";
import { useRouter } from "next/router";

const useSearch = (view: CategoryView[]) => {
    const router = useRouter();
    const searchQueryRef = useRef<{ id?: number; label: string }>({ label: "" });
    const categoryRef = useRef<{ selected: string; expanded: string[] }>({
        selected: "0",
        expanded: [],
    });
    const [trigger, { data: users, isLoading, isSuccess, error }] = useLazyGetUsersByCategorIdQuery();

    useEffect(() => {
        if (!router.query.q) {
            return;
        }

        const category = view.find(cat => cat.id === +router.query.q!);

        if (!category) {
            return;
        }

        categoryRef.current = {
            selected: category.id.toString(),
            expanded: category.parents.map(parent => parent.id.toString()),
        };

        searchQueryRef.current = {
            id: category.id,
            label: category.label,
        };

        trigger(category.id, true);
    }, [router.query.q]);

    const switchCategory = useCallback((arg: CategoryView | { id: number; label: string }) => {
        if ((arg as CategoryView).parents) {
            const category = arg as CategoryView;
            categoryRef.current = {
                selected: category.id.toString(),
                expanded: category.parents.map(parent => parent.id.toString()),
            };
        }

        searchQueryRef.current = arg;

        trigger(arg.id, true);

        router.push("", `?q=${arg.id}`, { shallow: true });
    }, []);

    return {
        users,
        isLoading,
        isSuccess,
        error,
        curCategory: categoryRef.current,
        searchQuery: searchQueryRef.current,
        switchCategory,
    };
};

export default useSearch;
