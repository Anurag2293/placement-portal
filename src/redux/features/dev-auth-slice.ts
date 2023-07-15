import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isAuthenticated: boolean;
    name: string;
    id: string;
    isModerator: boolean;
}

type InitialState = {
    value: AuthState
}

const initialState = {
    value: {
        isAuthenticated: false,
        name: "",
        id: "",
        isModerator: false,
    } as AuthState
} as InitialState;

export const auth = createSlice({
    name: 'auth',
    initialState,
    // Reducers are actual function that take in action and state and return new state
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuthenticated: true,
                    name: action.payload,
                    id: "",
                    isModerator: false,
                }
            }
        },
        toggleModerator: (state) => {
            state.value.isModerator = !state.value.isModerator;
        }
    }
});

// Exporting functions from auth actions
export const { logIn, logOut } = auth.actions;
export default auth.reducer;