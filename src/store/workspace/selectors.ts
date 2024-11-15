import {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

const selectRootWorkspace = (state: RootState) => state.workspace;

export const selectHasAccess = createSelector(selectRootWorkspace, workspace => workspace.hasAccess);
export const selectIp = createSelector(selectRootWorkspace, workspace => workspace.ip)