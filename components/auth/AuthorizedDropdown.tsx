import React from "react";
import Cookie from "js-cookie";
import { Button, Stack, Typography } from "@mui/material";
import { useGetSelfQuery } from "../../services/user";
import Avatar from "../../ui/Avatar";
import NextLink from "../../ui/NextLink";

interface AuthorizedDropdownProps {
    onClick?: () => void;
}

const AuthorizedDropdown = ({ onClick }: AuthorizedDropdownProps) => {
    const { data: user, refetch } = useGetSelfQuery(undefined);

    const onClickAction = () => onClick && onClick();

    const logout = () => {
        Cookie.remove("token");
        refetch();
        onClickAction();
    };

    return (
        <Stack alignItems="center" width="max-content">
            <Avatar src={user!.avatar} height={70} width={70} />
            <Typography fontWeight="medium" fontSize={20} color="text.primary">
                {user?.firstName}
            </Typography>
            <Typography fontSize={16} color="text.secondary" gutterBottom>
                {user?.email}
            </Typography>
            <NextLink href={`/userProfile/${user?.id}`}>
                <Button component="div" variant="outlined" sx={{ my: 2 }} onClick={onClickAction}>
                    Моя страница
                </Button>
            </NextLink>
            <Button variant="outlined" onClick={logout}>
                Выйти
            </Button>
        </Stack>
    );
};

export default AuthorizedDropdown;
