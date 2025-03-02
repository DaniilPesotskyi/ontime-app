import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteRecord} from '../../api/records';
import {RECORDS_QUERY_KEY} from "../../constants.ts";

export const useDeleteRecord = (companyId: string, userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (recordDay: string) => deleteRecord(companyId, userId, recordDay),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [RECORDS_QUERY_KEY, companyId, userId]});
        },
    });
};
