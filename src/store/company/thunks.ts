import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICompany} from "../../types/companyTypes.ts";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../services/firestore.ts";
import {LOCAL_STORAGE_COMPANY_KEY} from "../../constants.ts";

export const initializeCompanyThunk = createAsyncThunk(
    "company/initializeCompanyThunk",
    async (_, {dispatch, rejectWithValue}) => {
        const companyId = localStorage.getItem(LOCAL_STORAGE_COMPANY_KEY);
        if (companyId) {
            await dispatch(fetchCompanyByRequestIdThunk(companyId.replaceAll('"', '')));
            return
        } else {
            return rejectWithValue('')
        }
    }
);

export const fetchCompanyByRequestIdThunk = createAsyncThunk(
    'company/fetchCompanyByRequestIdThunk',
    async (requestId: ICompany['requestId'], {rejectWithValue}) => {
        try {
            const companiesRef = collection(db, 'companies');
            const q = query(companiesRef, where("requestId", "==", requestId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return rejectWithValue('Невірний код')
            }

            const companyDoc = querySnapshot.docs[0];

            return {id: companyDoc.id, ...companyDoc.data()} as ICompany;
        } catch (error) {
            return rejectWithValue('Помилка серверу');
        }
    }
)