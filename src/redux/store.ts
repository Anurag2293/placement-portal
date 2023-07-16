import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import hireAuthReducer from "./features/hire-auth-slice";

export const store = configureStore({
    reducer: {
        hireAuth: hireAuthReducer
    },
});

// Get types for this store and export them
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export custom useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;