import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            main: mode === "light" ? "#d37800" : "#ff9100",
            light: "#ffaf4f",
            dark: "#9d5800",
            contrastText: mode === "light" ? "black" : "white",
        },
        secondary: {
            main: "#0000FF",
            light: "#3A3AFF",
            dark: "#000098",
            contrastText: mode === "light" ? "black" : "white",
        },
        background: {
            default: mode === "light" ? "#f0f0f0" : "#1e1e1e",
            paper: mode === "light" ? "#ddd" : "#333",
        },
    },
});

export const mainTheme = createTheme(getDesignTokens("dark"));

export default getDesignTokens;
