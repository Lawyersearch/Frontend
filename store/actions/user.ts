import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { User } from "../../types/user";

export const fetchSelf = createAsyncThunk<User, string | undefined>("/user/self", async token => {
    token ??= Cookie.get("token");

    const self = await fetch(`${process.env.BACK_SERVER_API}/user/myself`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    return (await self.json()).data as User;
});
