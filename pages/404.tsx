import { Stack, Typography } from "@mui/material";
import NextLink from "../ui/NextLink";

const NotFoundPage = () => {
    return (
        <Stack alignItems="center">
            <Stack width="80vw" alignItems="center" mt="10vh">
                <Typography variant="h1" fontWeight={500}>
                    404
                </Typography>
                <Typography variant="h4" fontWeight={400}>
                    Упс! Что-то пошло не так
                </Typography>
                <NextLink href="/">
                    <Typography
                        variant="h5"
                        mt={2}
                        sx={{
                            textDecoration: "underline",
                            ":hover": {
                                color: "primary.main",
                            },
                        }}
                    >
                        Вернуться на главную страницу
                    </Typography>
                </NextLink>
            </Stack>
        </Stack>
    );
};

export default NotFoundPage;
