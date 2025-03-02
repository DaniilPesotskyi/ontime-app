import {useQuery} from '@tanstack/react-query';

import {IRecord} from '../../types/record';

import {getRecordsByPeriod} from '../../api/records';

import {RECORDS_QUERY_KEY} from "../../constants.ts";

export const useRecordsByPeriod = (
    companyId: string,
    userId: number,
    startDate: string,
    endDate: string
) => {
    return useQuery<IRecord[]>({
        queryKey: [RECORDS_QUERY_KEY, companyId, userId, startDate, endDate],
        queryFn: () => getRecordsByPeriod(companyId, String(userId), startDate, endDate),
        enabled: !!startDate || !!endDate || !!userId || !!companyId,
        staleTime: 1000 * 60
    });
};
