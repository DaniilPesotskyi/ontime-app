import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "./firestore.ts";
import {ICompany} from "../types/company";
import {IUser} from "../types/user";

export const getCompanyByRequest = async (requestId: string): Promise<ICompany | null> => {
    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("requestId", "==", requestId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as ICompany))[0];
};

export const getCompanyById = async (id: string): Promise<ICompany> => {
    const companyRef = doc(db, "companies", id);
    const companySnap = await getDoc(companyRef);

    if (!companySnap.exists()) {
        throw new Error("Помилка!");
    }

    return {id: companySnap.id, ...companySnap.data()} as ICompany;
};

export const getUsersByCompanyId = async (companyId: string): Promise<IUser[]> => {
    const usersRef = collection(db, "companies", companyId, "users");
    const querySnapshot = await getDocs(usersRef);

    return querySnapshot.docs.map(doc => ({
        id: Number(doc.id),
        name: doc.data().name,
        role: doc.data().role,
        telegramId: doc.data().telegramId,
    }));
};