import { Box, Container, Stack, Typography } from "@mui/material";
import NextLink from "../ui/NextLink";

const NotFound = () => {
    return (
        <Container>
            <Stack
                alignItems="center"
                height="calc(100vh - 64px - 16px)"
                borderRadius={4}
                p={2}
                sx={{
                    backgroundColor: "#d32f2f",
                }}
            >
                <Typography variant="h1" mt="auto" color="#fff">
                    404
                </Typography>
                <Box mt="auto">
                    <NextLink href="/">
                        <Typography mt="auto" variant="body1" sx={{ textDecoration: "underline" }} color="#fff">
                            Перейти на главную страницу
                        </Typography>
                    </NextLink>
                </Box>
            </Stack>
        </Container>
    );
};

export default NotFound;
