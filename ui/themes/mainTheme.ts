import { PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { DeepPartial } from "redux";

const mkContrastText = (mode: PaletteMode) => (mode === "light" ? "black" : "white");

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            main: "#ff9100",
            light: "#ffaf4f",
            dark: "#9d5800",
            contrastText: mkContrastText(mode),
        },
        secondary: {
            main: "#0000ff",
            light: "#3a3aff",
            dark: "#000098",
            contrastText: mkContrastText(mode),
        },
        error: {
            main: "#ff4900",
            light: "#ff743c",
            dark: "#7b2300",
            contrastText: mkContrastText(mode),
        },
        background: {
            default: mode === "light" ? "#f0f0f0" : "#1e1e1e",
            paper: mode === "light" ? "#ddd" : "#333",
        },
    },
});

export const mainTheme = createTheme(getDesignTokens("dark"));

export default getDesignTokens;
