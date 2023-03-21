import { Card, Box, CardContent, Typography } from "@mui/material";

const RegisterDonePage = () => {
    return (
        <Box display="flex" justifyContent="center" alignSelf="center">
            <Card>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h3" gutterBottom component="h1">
                        Аккаунт успешно зарегистрирован
                    </Typography>
                    <Typography variant="body1" component="p">
                        Подтвердите регистрацию, перейдя по ссылке из письма, отправленного на почту
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegisterDonePage;
