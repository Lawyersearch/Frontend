import { Stack, Typography, Chip } from "@mui/material";
import { GetStaticProps } from "next/types";
import { useCallback } from "react";
import useSearch from "../hooks/useSearch";
import { queryView } from "../utils/query";
import { CategoryView } from "../types/category";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/router";
import NextLink from "../ui/components/NextLink";
import { wrapper } from "../store";
import { setCategoryView } from "../store/reducers/uiSlice";

interface IndexPageProps {
    view: CategoryView[];
}

const IndexPage = ({ view }: IndexPageProps) => {
    const { searchQuery } = useSearch(view);
    const router = useRouter();
    const switchCategory = useCallback(
        ({ id }: { id: number }) => {
            router.push(`/search?q=${id}`);
        },
        [router],
    );

    return (
        <Stack justifyContent="center" alignItems="center" mt={10}>
            <Stack width="80vw" spacing={3}>
                <Typography variant="h1" fontWeight={400}>
                    Лучше пишите нам
                </Typography>
                <SearchBar searchQuery={searchQuery} switchCategory={switchCategory} />
                <Stack direction="row" spacing={2}>
                    {view.map(({ id, label }) => (
                        <NextLink key={id} href={`/search?q=${id}`}>
                            <Chip label={label}></Chip>
                        </NextLink>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async context => {
    const { view } = await queryView();

    store.dispatch(setCategoryView(view));

    return {
        props: { view },
        revalidate: +process.env.STATIC_REVALIDATE,
    };
});

export default IndexPage;
