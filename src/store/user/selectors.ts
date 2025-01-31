import {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

const selectRootUser = (state: RootState) => state.user;

export const selectUser = createSelector(selectRootUser, user => user.user);
export const selectUserInLoad = createSelector(selectRootUser, user => user.inLoad);
export const selectUserError = createSelector(selectRootUser, user => user.error);