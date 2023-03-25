import React from "react";
import { AppBar, IconButton, Toolbar, Typography, Badge, useTheme, Box, ClickAwayListener, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavLinks from "./NavLinks";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AuthorizedDropdown from "./auth/AuthorizedDropdown";
import AuthForm from "./auth/AuthForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux/useTypedRedux";
import { toggleMode } from "../store/reducers/uiSlice";
import { useBoolean } from "../hooks/useBoolean";
import { useDropdownAuth } from "../hooks/useDropdownAuth";
import Avatar from "../ui/Avatar";

const NavBar = () => {
    const user = useAppSelector(store => store.user.self);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal, setHideModal, toggleModal] = useBoolean(false);
    const theme = useTheme();

    useDropdownAuth(() => {
        if (!user) {
            setShowModal();
        }
    });

    const toggleColorMode = () => {
        dispatch(toggleMode());
    };

    return (
        <AppBar position="static" sx={{ mb: 1, height: 64 }}>
            <Toolbar>
                <Stack direction="row" alignItems="center">
                    <Typography variant="h6" component="h1" display={{ xs: "none", sm: "block" }} mr={2}>
                        StartUp
                    </Typography>
                    <NavLinks />
                </Stack>
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                        ml: "auto",
                    }}
                >
                    <IconButton sx={{ ml: "auto" }} color="inherit" onClick={toggleColorMode}>
                        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={0} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <ClickAwayListener onClickAway={setHideModal}>
                        <Box>
                            <IconButton size="large" edge="end" color="inherit" onClick={toggleModal}>
                                {user ? <Avatar src={user.avatar} height={24} width={24} /> : <AccountCircleIcon />}
                            </IconButton>
                            <Box
                                position="absolute"
                                zIndex={10}
                                bgcolor="background.paper"
                                top="70px"
                                right="5px"
                                p={4}
                                sx={{
                                    border: "1px solid #aaaa",
                                    borderRadius: "10px",
                                    transformOrigin: "top right",
                                    transform: `scaleY(${+showModal}) scaleX(${+showModal})`,
                                    transition: "transform .25s ease-in-out",
                                }}
                            >
                                {user ? <AuthorizedDropdown onClick={setHideModal} /> : <AuthForm />}
                            </Box>
                        </Box>
                    </ClickAwayListener>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
