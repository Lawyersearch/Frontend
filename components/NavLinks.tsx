import React from "react";
import { Button, Stack } from "@mui/material";
import NextLink from "../ui/NextLink";
import { useAppSelector } from "../hooks/redux/useTypedRedux";

const NavLinks = () => {
    const user = useAppSelector(store => store.user.self);

    const links = [
        { title: "Главная", to: "/", show: true },
        {
            title: "Моя страница",
            to: `/userProfile/${user?.id}`,
            show: Boolean(user),
        },
        { title: "Доска заказов", to: "/orders", show: true },
        { title: "Поиск", to: "/search", show: true },
    ];

    return (
        <Stack
            component="nav"
            direction="row"
            alignItems="center"
            spacing={{ xs: 1.5, sm: 2 }}
            width="fit-content"
            visibility="visible"
        >
            {links
                .filter(link => link.show)
                .map(link => (
                    <NextLink key={link.title} href={link.to}>
                        <Button
                            variant="contained"
                            component="div"
                            sx={{
                                p: { xs: "3px 4px", sm: "6px 16px" },
                                width: "max-content",
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                    opacity: 1,
                                },
                            }}
                        >
                            {link.title}
                        </Button>
                    </NextLink>
                ))}
        </Stack>
    );
};

export default NavLinks;
