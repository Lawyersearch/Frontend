import SearchBar from "../components/SearchBar";
import { Stack, Container, Grid } from "@mui/material";
import Categories from "../components/Categories";
import NetHandler from "../ui/NetHandler";
import UserCard from "../components/user/UserCard";
import useSearch from "../hooks/useSearch";
import { CategoryTree, CategoryView } from "../types/category";
import { GetStaticProps } from "next";
import { experienceString } from "../utils/wordsEndings";
import { queryView } from "../utils/query";
import { wrapper } from "../store";
import { setCategoryView } from "../store/reducers/uiSlice";

interface SearchPageProps {
    categories: CategoryTree[];
    view: CategoryView[];
}

const SearchPage = ({ categories, view }: SearchPageProps) => {
    const { users, isLoading, isSuccess, error, curCategory, searchQuery, switchCategory } = useSearch(view);

    return (
        <Container>
            <SearchBar searchQuery={searchQuery} switchCategory={switchCategory} />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={3}>
                    <Categories tree={categories} category={curCategory} switchCategory={switchCategory} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <NetHandler isLoading={isLoading} isSuccess={isSuccess} error={error} h="160px" w="100%">
                        <Stack spacing={2}>
                            {users?.map(user => (
                                <UserCard
                                    id={user.id}
                                    key={user.id}
                                    avatar={user.avatar}
                                    userName={`${user.lastName} ${user.firstName} ${user.middleName}`}
                                    tasks={user.categories!}
                                    rating={user.rating}
                                    feedBacks={user.reviewCount}
                                    description={user.description}
                                    experience={experienceString(user.expirience)}
                                />
                            ))}
                        </Stack>
                    </NetHandler>
                </Grid>
            </Grid>
        </Container>
    );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async context => {
    const { view, categories } = await queryView();

    store.dispatch(setCategoryView(view));

    return {
        props: { categories, view },
        revalidate: +process.env.STATIC_REVALIDATE,
    };
});

export default SearchPage;
