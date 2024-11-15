import {IRecord} from "./recordsTypes.ts";

export interface IUser {
    id: number,
    telegramId: number,
    name: string,
    role: 'admin' | 'user',
    records: IRecord[]
}