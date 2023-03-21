import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import userReducer from "./reducers/userSlice";
import uiReducer from "./reducers/uiSlice";
import networkingMiddleware from "../ui/networkingMiddleware";
import { authApi } from "../services/auth";
import { userApi } from "../services/user";
import { educationApi } from "../services/education";
import { workExperienceApi } from "../services/workExperience";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        ui: uiReducer,

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [educationApi.reducerPath]: educationApi.reducer,
        [workExperienceApi.reducerPath]: workExperienceApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["ui/setPushSnack"] as any,
                ignoreState: ["ui/pushSnack"] as any,
            },
        })
            .concat(networkingMiddleware)
            .concat(authApi.middleware)
            .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
