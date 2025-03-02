import { db } from "./firestore.ts";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {IUser} from "../types/user";

export const getUserById = async (companyId: string, userId: string, userData: IUser): Promise<IUser> => {
    const userRef = doc(db, `companies/${companyId}/users/${userId}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        // @ts-ignore
        return { id: userSnap.id, ...userSnap.data() };
    }

    await setDoc(userRef, userData);
    return userData;
};

