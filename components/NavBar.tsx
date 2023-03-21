import React, { useEffect } from "react";
import { AppBar, IconButton, Toolbar, Typography, Badge, useTheme, Box, ClickAwayListener, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavLinks from "./NavLinks";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useGetSelfQuery } from "../services/user";
import AuthorizedDropdown from "./auth/AuthorizedDropdown";
import AuthForm from "./auth/AuthForm";
import { useAppDispatch } from "../hooks/redux/useTypedRedux";
import { toggleMode } from "../store/reducers/uiSlice";
import { useBoolean } from "../hooks/useBoolean";
import { useDropdownAuth } from "../hooks/useDropdownAuth";
import Avatar from "../ui/Avatar";

const NavBar = () => {
    const { data: user, isSuccess } = useGetSelfQuery(undefined);
    const [showLinks, , hideLinks, toggleLinks] = useBoolean(false);
    const [lastShow, trueLastShow, falseLastShow] = useBoolean(false);
    const [showModal, setShowModal, setHideModal, toggleModal] = useBoolean(false);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    useDropdownAuth(() => {
        if (!isSuccess) {
            setShowModal();
        }
    });

    useEffect(() => {
        if (!showLinks && lastShow) {
            setTimeout(falseLastShow, 200);
        }
        if (showLinks && !lastShow) {
            trueLastShow();
        }
    }, [showLinks]);

    const toggleColorMode = () => {
        dispatch(toggleMode());
    };

    return (
        <AppBar position="static" sx={{ mb: 1, height: 64 }}>
            <Toolbar>
                <ClickAwayListener onClickAway={hideLinks}>
                    <Stack direction="row" alignItems="center">
                        <IconButton onClick={toggleLinks}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="h1" display={lastShow ? "none" : "block"}>
                            StartUp
                        </Typography>
                        <NavLinks show={showLinks} lastShow={lastShow} />
                    </Stack>
                </ClickAwayListener>
                <Box
                    sx={{
                        display: {
                            xs: showLinks || lastShow ? "none" : "flex",
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
                                {isSuccess && user ? (
                                    <Avatar src={user.avatar} height={24} width={24} />
                                ) : (
                                    <AccountCircleIcon />
                                )}
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
                                {isSuccess && user ? <AuthorizedDropdown onClick={setHideModal} /> : <AuthForm />}
                            </Box>
                        </Box>
                    </ClickAwayListener>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
