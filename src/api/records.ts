import {db} from "./firestore.ts";
import {IRecord} from "../types/record";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    orderBy,
} from "firebase/firestore";

export const addRecords = async (
    companyId: string,
    userId: string,
    records: IRecord[]
): Promise<{ success: boolean }> => {
    const recordsCollectionRef = collection(
        db,
        "companies",
        companyId,
        "users",
        userId,
        "records"
    );
    const promises = records.map((record) =>
        addDoc(recordsCollectionRef, record)
    );
    await Promise.all(promises);
    return {success: true};
};

export const getRecords = async (
    companyId: string,
    userId: string
): Promise<IRecord[]> => {
    const recordsCollectionRef = collection(
        db,
        "companies",
        companyId,
        "users",
        userId,
        "records"
    );
    const querySnapshot = await getDocs(recordsCollectionRef);
    const records: IRecord[] = [];
    querySnapshot.forEach((docSnap) => {
        // @ts-ignore
        records.push({id: docSnap.id, ...docSnap.data()} as IRecord);
    });
    return records;
};

export const getRecordsByPeriod = async (
    companyId: string,
    userId: string,
    startDate: string,
    endDate: string
): Promise<IRecord[]> => {
    const recordsCollectionRef = collection(
        db,
        "companies",
        companyId,
        "users",
        userId,
        "records"
    );

    const q = query(
        recordsCollectionRef,
        where("day", ">=", startDate.replaceAll('/', '-')),
        where("day", "<=", endDate.replaceAll('/', '-')),
        orderBy("day")
    );

    const querySnapshot = await getDocs(q);
    const records: IRecord[] = [];
    querySnapshot.forEach((docSnap) => {
        // @ts-ignore
        records.push({id: docSnap.id, ...docSnap.data()} as IRecord);
    });
    return records;
};

export const deleteRecord = async (
    companyId: string,
    userId: string,
    recordDay: string
): Promise<{ success: boolean; message?: string }> => {
    const recordsCollectionRef = collection(
        db,
        "companies",
        companyId,
        "users",
        userId,
        "records"
    );
    const q = query(recordsCollectionRef, where("day", "==", recordDay));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return {success: false, message: "Запись не найдена"};
    }
    const docToDelete = querySnapshot.docs[0];
    await deleteDoc(docToDelete.ref);
    return {success: true};
};
