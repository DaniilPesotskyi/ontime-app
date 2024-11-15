import {IUser} from "./userTypes.ts";

export interface ICompany {
    id: string,
    title: string,

    requestId: string

    ip: string,

    startWorkHour: number,
    minorDelay: number,
    severeDelay: number,

    users: IUser[],
}