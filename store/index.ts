import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'
import userReducer from './reducers/userSlice'
import uiReducer from './reducers/uiSlice'
import networkingMiddleware from '../ui/networkingMiddleware'
import { authApi } from '../services/auth'
import { userApi } from '../services/user'
import { searchApi } from '../services/search'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,

    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['ui/setPushSnack'] as any,
        ignoreState: ['ui/pushSnack'] as any
      }
    })
      .concat(networkingMiddleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(searchApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
