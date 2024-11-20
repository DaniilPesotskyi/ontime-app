import {IUser} from "../types/userTypes.ts";
import {ICompany} from "../types/companyTypes.ts";

export const calculateAttendanceData = (
    records: IUser['records'],
    company: ICompany
) => {
    return records.reduce(
        (acc, record) => {
            const [hours, minutes] = record.time.split(":").map(Number);
            const arrivalTime = hours * 60 + minutes;
            const startTime = company.startWorkHour * 60;

            const delay = arrivalTime - startTime;

            if (delay <= 0) {
                acc.onTime += 1;
            } else if (delay > 0 && delay <= company.minorDelay) {
                acc.minorDelay += 1;
            } else if (delay > company.minorDelay && delay <= company.significantDelay) {
                acc.significantDelay += 1;
            } else if (delay > company.significantDelay && delay <= company.majorDelay) {
                acc.majorDelay += 1;
            } else {
                acc.severeDelay += 1;
            }

            return acc;
        },
        {
            onTime: 0,
            minorDelay: 0,
            significantDelay: 0,
            majorDelay: 0,
            severeDelay: 0
        }
    );
};
