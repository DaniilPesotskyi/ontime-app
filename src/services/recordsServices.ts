import {doc, updateDoc, deleteDoc, arrayUnion} from "firebase/firestore";
import {db} from "./firestore.ts";

import {IRecord} from "../types/recordsTypes.ts";

export const addRecord = async (companyId: string, userId: number, newRecord: IRecord): Promise<IRecord> => {
    try {
        const userRef = doc(db, `companies/${companyId}/users`, userId.toString());

        await updateDoc(userRef, {
            records: arrayUnion(newRecord)
        });

        console.log("Отметка добавлена:", newRecord);

        return newRecord;
    } catch (error) {
        console.error("Ошибка при добавлении отметки:", error);
        throw new Error("Не удалось добавить отметку");
    }
};

export const deleteRecord = async (userId: string, yearMonth: string, day: number): Promise<void> => {
    try {
        const recordRef = doc(db, `users/${userId}/records/${yearMonth}/${day}`);
        await deleteDoc(recordRef);
        console.log("Отметка удалена за день:", day);
    } catch (error) {
        console.error("Ошибка при удалении отметки:", error);
        throw new Error("Не удалось удалить отметку");
    }
};

export const updateRecordField = async (
    userId: string,
    yearMonth: string,
    day: number,
    field: keyof IRecord,
    value: IRecord[keyof IRecord]
): Promise<void> => {
    try {
        const recordRef = doc(db, `users/${userId}/records/${yearMonth}/${day}`);
        await updateDoc(recordRef, {[field]: value});
        console.log(`Поле ${field} обновлено на значение:`, value);
    } catch (error) {
        console.error(`Ошибка при обновлении поля ${field} в отметке:`, error);
        throw new Error("Не удалось обновить поле в отметке");
    }
};
