import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "..";
import { User } from "../../types/user";
import { fetchSelf } from "../actions";

interface UserState {
    self?: User;
}

const initialState: UserState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelf: (state, action: PayloadAction<User | undefined>) => {
            state.self = action.payload;
        },
        removeSelf: state => {
            delete state.self;
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
