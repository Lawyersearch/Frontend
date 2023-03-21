import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Snack } from "../../types/snack";
import { CategoryView } from "../../types/category";
import { PaletteMode } from "@mui/material";

interface UiSlice {
    pushSnack?: (snack: Snack) => void;
    categoryView: CategoryView[] | null;
    searchQuery?: string;
    mode: PaletteMode;
}

const initialState: UiSlice = {
    categoryView: null,
    mode: "dark",
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setPushSnack: (state, action: PayloadAction<(snack: Snack) => void>) => {
            state.pushSnack = action.payload;
        },
        pushSnack: (state, action: PayloadAction<Snack>) => {
            state.pushSnack && state.pushSnack(action.payload);
        },
        setCategoryView: (state, action: PayloadAction<CategoryView[]>) => {
            state.categoryView = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setMode: (state, action: PayloadAction<PaletteMode>) => {
            state.mode = action.payload;
        },
        toggleMode: state => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

export const { setPushSnack, pushSnack, setCategoryView, setMode, toggleMode } = uiSlice.actions;

export default uiSlice.reducer;
