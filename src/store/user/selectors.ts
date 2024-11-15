import {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

const selectRootUser = (state: RootState) => state.user;

export const selectUser = createSelector(selectRootUser, user => user.user);