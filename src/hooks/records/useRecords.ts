import {useQuery} from '@tanstack/react-query';
import {IRecord} from '../../types/record';
import {getRecords} from '../../api/records';
import {RECORDS_QUERY_KEY} from "../../constants.ts";

export const useRecords = (companyId: string, userId: string) => {
    return useQuery<IRecord[]>({
            queryKey: [RECORDS_QUERY_KEY, companyId, userId],
            queryFn: () => getRecords(companyId, userId)
        }
    );
};
