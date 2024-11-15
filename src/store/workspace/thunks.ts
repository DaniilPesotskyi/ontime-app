import {createAsyncThunk} from "@reduxjs/toolkit";

import {getIp} from "../../services/getIp.ts";
import {RootState} from "../store.ts";

export const fetchIpAndCheckAccess = createAsyncThunk(
    "workspace/fetchIpAndCheckAccess",
    async (_, {getState, rejectWithValue}) => {
        try {
            const ip = await getIp();
            const state = getState() as RootState

            const hasAccess = ip === state.company.company?.ip;
            return {ip, hasAccess};
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);