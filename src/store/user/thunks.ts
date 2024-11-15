import {createAsyncThunk} from "@reduxjs/toolkit";
import {createUser, getUserById} from "../../services/usersServices.ts";
import {RootState} from "../store.ts";
import {IUser} from "../../types/userTypes.ts";
import {addRecord} from "../../services/recordsServices.ts";
import {IRecord} from "../../types/recordsTypes.ts";

export const getUserThunk = createAsyncThunk(
    'user/getUserThunk',
    async (_, {getState, rejectWithValue}) => {
        const state = getState() as RootState;
        const companyId = state.company.company?.id;

        // TODO: use user from telegram
        if (!companyId) {
            return rejectWithValue("Компания не найдена");
        }
        // @ts-ignore
        const telegramUser = window.Telegram.WebApp.initDataUnsafe.user
        console.log(telegramUser)

        try {
            const user = await getUserById(companyId, telegramUser.id);
            if (user) {
                return user;
            }

            const newUserData: IUser = {
                imageUrl: telegramUser.photo_url ? telegramUser.photo_url : '',
                records: [],
                role: 'user',
                telegramId: telegramUser.id,
                id: telegramUser.id,
                name: telegramUser.first_name
            };

            return await createUser(companyId, newUserData);
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Не удалось получить или создать пользователя");
        }
    }
);

export const addRecordThunk = createAsyncThunk(
    'user/addRecordThunk',
    async (record: IRecord, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            return await addRecord(state.company.company!.id, state.user.user!.id, record);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


// export const editRecordThunk = createAsyncThunk(
//     'user/editRecordThunk',
//     async (_, {rejectWithValue}) => {
//         try {
//
//         } catch (error) {
//
//         }
//     }
// )