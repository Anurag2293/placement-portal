import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HireState = {
    name: string;
    hrName: string;
    id: string;
    createdAt: string;
    location: string;
    website: string;
    logo: string;
}

type InitialState = {
    value: HireState
}

type LoginPayloadAction = {
    name: string;
    hrName: string;
    id: string;
    createdAt: string;
    location: string;
    website: string;
    logo: string;
};

const initialState = {
    value: {
        name: "",
        id: "",
        hrName: "",
        createdAt: "",
        location: "",
        website: "",
        logo: "",
    } as HireState
} as InitialState;

export const hire = createSlice({
    name: 'hire',
    initialState,
    // Reducers are actual function that take in action and state and return new state
    reducers: {
        reduxlogOut: () => {
            return initialState;
        },
        reduxlogIn: (state, action: PayloadAction<LoginPayloadAction>) => {
            return {
                value: {
                    name: action.payload.name,
                    id: action.payload.id,
                    hrName: action.payload.hrName,
                    createdAt: action.payload.createdAt,
                    location: action.payload.location,
                    website: action.payload.website,
                    logo: action.payload.logo,
                }
            }
        }
    }
});

// Exporting functions from hire actions
export const { reduxlogIn, reduxlogOut } = hire.actions;
export default hire.reducer;