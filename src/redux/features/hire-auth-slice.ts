import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isAuthenticated: boolean;
    name: string;
    hrName: string;
    id: string;
}

type InitialState = {
    value: AuthState
}

type LoginPayloadAction = {
    name: string;
    hrName: string;
    id: string;
};

const initialState = {
    value: {
        isAuthenticated: false,
        name: "",
        id: "",
    } as AuthState
} as InitialState;

export const auth = createSlice({
    name: 'hire-auth',
    initialState,
    // Reducers are actual function that take in action and state and return new state
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action: PayloadAction<LoginPayloadAction>) => {
            return {
                value: {
                    isAuthenticated: true,
                    name: action.payload.name,
                    id: action.payload.id,
                    hrName: action.payload.hrName,
                    isModerator: false,
                }
            }
        }
    }
});

// Exporting functions from auth actions
export const { logIn, logOut } = auth.actions;
export default auth.reducer;