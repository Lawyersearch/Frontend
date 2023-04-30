import Cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Snack } from "../../types/snack";
import { CategoryView } from "../../types/category";
import { PaletteMode } from "@mui/material";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";

interface UiState {
    pushSnack?: (snack: Snack) => void;
    categoryView: CategoryView[] | null;
    searchQuery?: string;
    mode: PaletteMode;
}

const initialState: UiState = {
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
            Cookie.set("mode", state.mode);
        },
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, typeof HYDRATE>) => {
            const modeFromCookie = Cookie.get("mode") as PaletteMode;
            const modeFromHydration = [action.payload.ui.mode, state.mode].includes("light") ? "light" : "dark";
            state.mode = modeFromCookie ?? modeFromHydration;
            state.categoryView = action.payload.ui.categoryView || state.categoryView;
        });
    },
});

export const { setPushSnack, pushSnack, setCategoryView, setMode, toggleMode } = uiSlice.actions;

export default uiSlice.reducer;
