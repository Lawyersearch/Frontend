import React from "react";
import { Button, Stack } from "@mui/material";
import { useGetSelfQuery } from "../services/user";
import NextLink from "../ui/NextLink";

interface NavLinksProps {
    show: boolean;
    lastShow: boolean;
}

const NavLinks = ({ show, lastShow }: NavLinksProps) => {
    const { data: user, isSuccess: isLogin } = useGetSelfQuery(undefined);

    const links = [
        { title: "Главная", to: "/", tf: -70, show: true },
        {
            title: "Моя страница",
            to: `/userProfile/${user?.id}`,
            tf: -185,
            show: isLogin,
        },
        { title: "Поиск", to: "/search", tf: -347 + 150 * +!isLogin, show: true },
    ];

    return (
        <Stack
            component="nav"
            direction="row"
            alignItems="center"
            spacing={{ xs: 1.5, sm: 2 }}
            width={lastShow ? "fit-content" : 0}
            visibility={lastShow ? "visible" : "hidden"}
        >
            {links.map(link => (
                <NextLink key={link.title} href={link.to}>
                    <Button
                        variant="contained"
                        component="div"
                        sx={{
                            display: link.show ? "block" : "none",
                            p: { xs: "3px 4px", sm: "6px 16px" },
                            width: "max-content",
                            transition: ".2s transform ease-in-out",
                            transform: show ? "" : `translateX(${link.tf}px)`,
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
