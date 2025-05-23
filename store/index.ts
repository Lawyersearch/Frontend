import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import counterReducer from "./reducers/counterSlice";
import userReducer from "./reducers/userSlice";
import uiReducer from "./reducers/uiSlice";
import networkingMiddleware from "../ui/components/networkingMiddleware";
import { authApi } from "../services/auth";
import { userApi } from "../services/user";
import { educationApi } from "../services/education";
import { workExperienceApi } from "../services/workExperience";
import { orderApi } from "../services/order";
import { offerApi } from "../services/offer";
import { messageApi } from "../services/messages";
import { reviewApi } from "../services/review";

export const makeStore = () =>
    configureStore({
        reducer: {
            counter: counterReducer,
            user: userReducer,
            ui: uiReducer,

            [authApi.reducerPath]: authApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            [educationApi.reducerPath]: educationApi.reducer,
            [workExperienceApi.reducerPath]: workExperienceApi.reducer,
            [orderApi.reducerPath]: orderApi.reducer,
            [offerApi.reducerPath]: offerApi.reducer,
            [messageApi.reducerPath]: messageApi.reducer,
            [reviewApi.reducerPath]: reviewApi.reducer,
        },
        devTools: process.env.NODE_ENV === "development",
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: ["ui/setPushSnack"] as any,
                    ignoreState: ["ui/pushSnack"] as any,
                },
            })
                .concat(networkingMiddleware)
                .concat(authApi.middleware)
                .concat(userApi.middleware)
                .concat(educationApi.middleware)
                .concat(workExperienceApi.middleware)
                .concat(orderApi.middleware)
                .concat(offerApi.middleware)
                .concat(messageApi.middleware)
                .concat(reviewApi.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
