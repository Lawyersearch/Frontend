import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { User } from "../../types/user";
import { querySelf } from "../../utils/query";

export const fetchSelf = createAsyncThunk<User | null, string | undefined>("/user/self", async token => {
    return querySelf(token ?? Cookie.get("token"));
});
