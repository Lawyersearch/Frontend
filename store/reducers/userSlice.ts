import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { User } from "../../types/user";
import { fetchSelf } from "../actions";

interface UserState {
    self: User | null;
}

const initialState: UserState = { self: null };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelf: (state, action: PayloadAction<User | null>) => {
            state.self = action.payload;
        },
        removeSelf: state => {
            state.self = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action: PayloadAction<RootState, typeof HYDRATE>) => {
            state.self ||= action.payload.user.self;
        });
        builder.addCase(fetchSelf.fulfilled, (state, action) => {
            state.self = action.payload;
        });
    },
});

export const { setSelf, removeSelf } = userSlice.actions;

export default userSlice.reducer;
