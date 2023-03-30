import React from "react";
import Cookie from "js-cookie";
import { Button, Stack, Typography } from "@mui/material";
import Avatar from "../../ui/components/Avatar";
import NextLink from "../../ui/components/NextLink";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useTypedRedux";
import { removeSelf } from "../../store/reducers/userSlice";
import { emptyUserText } from "../../ui/strings";

interface AuthorizedDropdownProps {
    onClick?: () => void;
}

const AuthorizedDropdown = ({ onClick }: AuthorizedDropdownProps) => {
    const user = useAppSelector(store => store.user.self);
    const dispatch = useAppDispatch();

    const onClickAction = () => onClick && onClick();

    const logout = () => {
        Cookie.remove("token");
        dispatch(removeSelf());
    };

    return (
        <Stack alignItems="center" width="max-content">
            <Avatar src={user?.avatar} height={70} width={70} />
            <Typography fontWeight="medium" fontSize={20} color="text.primary">
                {user?.firstName || emptyUserText}
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
