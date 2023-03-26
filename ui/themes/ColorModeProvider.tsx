import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import Cookie from "js-cookie";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getDesignTokens from "./mainTheme";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/useTypedRedux";
import { setMode } from "../../store/reducers/uiSlice";

interface ColorModeProviderProps {
    children: JSX.Element | JSX.Element[];
}

const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
    const mode = useAppSelector(state => state.ui.mode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storedMode = Cookie.get("mode");

        if (storedMode === "light") {
            dispatch(setMode("light"));
        } else if (!storedMode) {
            dispatch(setMode("dark"));
        }
    }, []);

    useEffect(() => {
        Cookie.set("mode", mode, {
            expires: 365,
        });
    }, [mode]);

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return (
        <ThemeProvider theme={theme}>
            <Box
                bgcolor={theme => theme.palette.background.default}
                sx={{
                    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                    overflowX: "clip",
                }}
                m={0}
                minHeight="100vh"
            >
                {children}
            </Box>
        </ThemeProvider>
    );
};

export default ColorModeProvider;
