import { Box, Button, Card, CardContent, Stack, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch } from "../hooks/redux/useTypedRedux";
import { useGetSelfQuery } from "../services/user";
import { pushSnack, toggleMode } from "../store/reducers/uiSlice";
import GridCenterItem from "../ui/GridCenterItem";
import Link from "next/link";
import { useRef } from "react";

const Index = () => {
    const { data: user, isSuccess, refetch } = useGetSelfQuery(undefined);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const clickId = useRef(0);

    const onProfileCreateClick = () => {
        if (isSuccess) {
            dispatch(pushSnack({ variant: "info", message: "Вы уже авторизованы" }));
        }
        router.push(`?auth=require_click${++clickId.current}`, "?auth", {
            shallow: true,
        });
    };

    const onThemeSwitchClick = () => {
        dispatch(toggleMode());
    };

    const onLogoutClick = () => {
        if (!isSuccess) {
            dispatch(pushSnack({ variant: "error", message: "Вы не авторизованы" }));
        } else {
            localStorage.removeItem("token");
            refetch();
            dispatch(pushSnack({ variant: "info", message: "Вы вышли из профиля" }));
        }
    };

    const onSelfPageClick = () => {
        if (!isSuccess) {
            dispatch(pushSnack({ variant: "error", message: "Вы не авторизованы" }));
        } else {
            router.push(`/userProfile/${user.id}`);
        }
    };

    return (
        <Card sx={{ m: 5 }}>
            <CardContent>
                <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h2" gutterBottom>
                        Landing
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Что можно сделать
                    </Typography>
                    <Box ml="auto" mb={5}>
                        <Typography variant="h6" gutterBottom>
                            Авторизационные данные:
                        </Typography>
                        <Typography variant="body1">Email: testmal1@mail.ru</Typography>
                        <Typography variant="body1" gutterBottom>
                            Password: testtest
                        </Typography>
                    </Box>
                    <Grid container spacing={3} mb={5}>
                        <GridCenterItem xs={12} sm={6} md={4}>
                            <Button variant="contained" onClick={onProfileCreateClick}>
                                Войти
                            </Button>
                        </GridCenterItem>
                        <GridCenterItem item xs={12} sm={6} md={4}>
                            <Link href="/search">
                                <a>
                                    <Button variant="contained" component="div">
                                        Посмотреть поиск
                                    </Button>
                                </a>
                            </Link>
                        </GridCenterItem>
                        <GridCenterItem item xs={12} sm={6} md={4}>
                            <Button variant="contained" onClick={onThemeSwitchClick}>
                                Переключить тему
                            </Button>
                        </GridCenterItem>
                        <GridCenterItem item xs={12} sm={6} md={4}>
                            <Button variant="contained" onClick={onSelfPageClick}>
                                Перейти на свою страницу
                            </Button>
                        </GridCenterItem>
                        <GridCenterItem item xs={12} sm={6} md={4}>
                            <Button variant="contained" onClick={onLogoutClick}>
                                Выйти из профиля
                            </Button>
                        </GridCenterItem>
                    </Grid>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque debitis excepturi
                        ipsa maiores, natus, possimus quidem rerum sed sunt totam ullam voluptatem voluptatibus,
                        voluptatum! Aliquid commodi ipsam minima numquam. Accusantium adipisci, at cum cupiditate
                        distinctio eius enim eum excepturi impedit in inventore iure magnam molestias necessitatibus
                        odit possimus quae quam repudiandae tenetur, veniam. Architecto beatae cumque cupiditate debitis
                        deleniti et iure neque non tempora vitae. Dolorem ex iste itaque iusto magnam maxime minima
                        neque nesciunt, officia officiis placeat sapiente, suscipit tempora ullam ut? Beatae dolorum
                        laudantium maxime odit officia provident qui quia quis ratione, recusandae repellendus
                        voluptatibus. Facere!
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Index;
