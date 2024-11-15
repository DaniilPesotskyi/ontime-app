import {setDoc, collection, doc, getDoc, getDocs} from "firebase/firestore";

import {db} from "./firestore.ts";

import {IUser} from "../types/userTypes.ts";

export const getAllUsersInCompany = async (companyId: string): Promise<IUser[]> => {
    try {
        const usersSnapshot = await getDocs(collection(db, `companies/${companyId}/users`));
        return usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as unknown as IUser));
    } catch (error) {
        console.error("Ошибка при получении пользователей компании:", error);
        throw new Error("Не удалось получить пользователей компании");
    }
};

export const getUserById = async (companyId: string, userId: number): Promise<IUser | null> => {
    try {
        const userRef = doc(db, `companies/${companyId}/users`, userId.toString());
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error("Пользователь не найден");
            return null;
        }

        const userData = userDoc.data() as IUser;
        const currentMonth = new Date().toISOString().slice(0, 7);

        const monthlyRecords = userData.records.filter(record => record.day && record.day.startsWith(currentMonth));

        return {...userData, records: monthlyRecords};
    } catch (error) {
        console.error("Ошибка при получении записей за текущий месяц:", error);
        throw new Error("Не удалось получить записи за текущий месяц");
    }
};

export const createUser = async (companyId: string, userData: IUser): Promise<IUser> => {
    try {
        const userRef = doc(db, `companies/${companyId}/users`, userData.id.toString());

        await setDoc(userRef, userData);
        console.log("Пользователь создан с заданным ID:", userData.id);

        return userData;
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error);
        throw new Error("Не удалось создать пользователя");
    }
};