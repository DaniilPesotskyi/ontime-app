import {RootState} from "../store.ts";
import {createSelector} from "@reduxjs/toolkit";

const selectRootCompany = (state: RootState) => state.company

export const selectCompany = createSelector(selectRootCompany, company => company.company)
export const selectCompanyInLoad = createSelector(selectRootCompany, company => company.inLoad)
export const selectCompanyError = createSelector(selectRootCompany, company => company.error)