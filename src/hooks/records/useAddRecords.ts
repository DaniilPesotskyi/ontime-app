import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IRecord } from "../../types/record";
import { addRecords } from "../../api/records";
import { RECORDS_QUERY_KEY } from "../../constants.ts";

export const useAddRecords = (companyId: string, userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (records: IRecord[]) => addRecords(companyId, String(userId), records),
        onMutate: async (newRecords) => {
            const queryKey = [RECORDS_QUERY_KEY, companyId, userId];

            const previousRecords = queryClient.getQueryData<IRecord[]>(queryKey) || [];

            queryClient.setQueryData<IRecord[]>(queryKey, (oldRecords = []) => [
                ...newRecords,
                ...oldRecords,
            ]);

            return { previousRecords };
        },
        onError: (_err, _newRecords, context) => {
            if (context?.previousRecords) {
                queryClient.setQueryData([RECORDS_QUERY_KEY, companyId, userId], context.previousRecords);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [RECORDS_QUERY_KEY, companyId, userId] });
        },
    });
};
