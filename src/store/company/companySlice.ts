import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {ICompany} from "../../types/companyTypes.ts";

import {fetchCompanyByRequestIdThunk, initializeCompanyThunk} from "./thunks.ts";
import {addToLocalStorage} from "../../utils/localStorage.ts";
import {LOCAL_STORAGE_COMPANY_KEY} from "../../constants.ts";

interface IState {
    company: ICompany | null;
    inLoad: boolean;
    error: string | null;
}

const initialState: IState = {
    company: null,
    inLoad: false,
    error: null,
};

const handlePending = (state: IState) => {
    state.inLoad = true;
    state.error = null;
};

const handleRejected = (state: IState, action: PayloadAction<unknown>) => {
    state.inLoad = false;
    state.error = typeof action.payload === 'string' ? action.payload : "Произошла ошибка";
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        clearCompany: (state: IState) => {
            state.inLoad = false;
            state.error = null;
            state.company = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeCompanyThunk.pending, handlePending)
            .addCase(initializeCompanyThunk.rejected, handleRejected)
            .addCase(fetchCompanyByRequestIdThunk.pending, handlePending)
            .addCase(fetchCompanyByRequestIdThunk.rejected, handleRejected)
            .addCase(initializeCompanyThunk.fulfilled, (state: IState) => {
                state.inLoad = false;
            })
            .addCase(fetchCompanyByRequestIdThunk.fulfilled, (state: IState, action: PayloadAction<ICompany | null>) => {
                state.inLoad = false;
                state.error = null;
                state.company = action.payload;

                if (action.payload) {
                    addToLocalStorage(LOCAL_STORAGE_COMPANY_KEY, action.payload.requestId);
                }
            });
    }
});
export const {clearCompany} = companySlice.actions;
export const companyReducer = companySlice.reducer;
