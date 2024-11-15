import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IUser} from "../../types/userTypes.ts";

import {addRecordThunk, getUserThunk} from "./thunks.ts";
import {IRecord} from "../../types/recordsTypes.ts";

interface IState {
    user: IUser | null

    inLoad: boolean
    error: string | null
}

const initialState: IState = {
    user: null,

    inLoad: false,
    error: null,
}

const handlePending = (state: IState) => {
    state.inLoad = true;
};

const handleRejected = (state: IState, action: { payload: string | null; }) => {
    state.inLoad = false;
    state.error = action.payload;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state: IState) => {
            state.inLoad = false;
            state.error = null;
            state.user = null;
        }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getUserThunk.fulfilled, (state: IState, action: PayloadAction<IUser | null>) => {
                    state.inLoad = false;
                    state.error = null;
                    state.user = action.payload;
                })
                .addCase(addRecordThunk.fulfilled, (state: IState, action: PayloadAction<IRecord>) => {
                    state.user!.records = [...state.user!.records, action.payload]
                    state.inLoad = false;
                    state.error = null;
                })
                .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
                .addMatcher(
                    (action) => action.type.endsWith("/rejected"),
                    handleRejected
                );
        },

})

export const {clearUser} = userSlice.actions;
export const userReducer = userSlice.reducer