import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {fetchIpAndCheckAccess} from "./thunks.ts";

interface IState {
    ip: string
    hasAccess: boolean
}

const initialState: IState = {
    ip: '0.0.0.0',
    hasAccess: false,
}

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIpAndCheckAccess.fulfilled, (state, action: PayloadAction<{
                ip: string,
                hasAccess: boolean
            }>) => {
                state.ip = action.payload.ip;
                state.hasAccess = action.payload.hasAccess;
            })
            .addCase(fetchIpAndCheckAccess.rejected, () => {
                alert("Помилка отримання IP");
            });
    },
})

export const {} = workspaceSlice.actions;
export const workspaceReducer = workspaceSlice.reducer