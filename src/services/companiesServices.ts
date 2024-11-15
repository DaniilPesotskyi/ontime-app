// import {collection, addDoc, getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
//
// import {db} from './firestore.ts'
//
// import {ICompany} from "../types/companyTypes.ts";

// export const getAllCompanies = async (): Promise<ICompany[]> => {
//     try {
//         const snapshot = await getDocs(collection(db, 'companies'));
//         return snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         } as ICompany));
//     } catch (error) {
//         console.error("Ошибка при получении списка компаний:", error);
//         throw new Error("Не удалось получить компании");
//     }
// };

// export const getCompanyById = async (companyId: string): Promise<ICompany> => {
//     try {
//         const companyDoc = await getDoc(doc(db, 'companies', companyId));
//         if (!companyDoc.exists()) {
//             throw new Error("Компания не найдена");
//         }
//         return {id: companyDoc.id, ...companyDoc.data()} as ICompany;
//     } catch (error) {
//         console.error("Ошибка при получении компании:", error);
//         throw new Error("Не удалось получить компанию");
//     }
// };
//
// export const createCompany = async (data: ICompany): Promise<ICompany> => {
//     try {
//         const companyRef = await addDoc(collection(db, 'companies'), data);
//         return {...data, id: companyRef.id,};
//     } catch (error) {
//         console.error("Ошибка при создании компании:", error);
//         throw new Error("Не удалось создать компанию");
//     }
// };
//
// export const updateCompany = async (companyId: string, updatedData: Partial<ICompany>): Promise<void> => {
//     try {
//         const companyRef = doc(db, 'Companies', companyId);
//         await updateDoc(companyRef, updatedData);
//         console.log("Компания успешно обновлена");
//     } catch (error) {
//         console.error("Ошибка при обновлении компании:", error);
//         throw new Error("Не удалось обновить компанию");
//     }
// };