import {combineReducers} from "@reduxjs/toolkit";

import {userReducer} from "./user/userSlice.ts";
import {companyReducer} from "./company/companySlice.ts";
import {workspaceReducer} from "./workspace/workspaceSlice.ts";

export const rootReducer = combineReducers({
    user: userReducer,
    company: companyReducer,
    workspace: workspaceReducer,
})