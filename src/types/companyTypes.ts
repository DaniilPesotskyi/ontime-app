import {IUser} from "./userTypes.ts";

export interface ICompany {
    id: string,
    title: string,

    requestId: string

    ip: string,

    startWorkHour: number,
    minorDelay: number,

    users: IUser[],
}