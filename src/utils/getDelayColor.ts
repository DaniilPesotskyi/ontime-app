import {ICompany} from "../types/company";

import {MAJOR_DELAY_COLOR, MINOR_DELAY_COLOR, SEVERE_DELAY_COLOR, SIGNIFICANT_DELAY_COLOR} from "../constants.ts";

export const getDelayColor = (company: ICompany, minutes: number) => {
    const {minorDelay, majorDelay, significantDelay} = company

    if (minutes === 0) {
        return 'transparent'
    } else if (minutes <= minorDelay) {
        return MINOR_DELAY_COLOR
    } else if (minutes > minorDelay && minutes <= significantDelay) {
        return SIGNIFICANT_DELAY_COLOR
    } else if (minutes > significantDelay && minutes <= majorDelay) {
        return MAJOR_DELAY_COLOR
    } else if (minutes > majorDelay) {
        return SEVERE_DELAY_COLOR
    }
}
