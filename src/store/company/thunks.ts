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
            const q = query(companiesRef, where('requestId', '==', requestId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return rejectWithValue('Невірний код');
            }

            const companyDoc = querySnapshot.docs[0];
            const companyData = {id: companyDoc.id, ...companyDoc.data()} as ICompany;

            const usersRef = collection(db, `companies/${companyDoc.id}/users`);
            const usersSnapshot = await getDocs(usersRef);

            const users: ICompany['users'] = usersSnapshot.docs.map(userDoc => ({
                id: Number(userDoc.id),
                name: userDoc.data().name,
                role: userDoc.data().role,
                telegramId: userDoc.data().telegramId,
                imageUrl: userDoc.data().imageUrl,
            }));

            return {...companyData, users};
        } catch (error) {
            return rejectWithValue('Помилка серверу');
        }
    }
)