import {useQuery} from "@tanstack/react-query";

import {IUser} from "../../types/user";

import {getUsersByCompanyId} from "../../api/companies.ts";

import {USERS_QUERY_KEY} from "../../constants.ts";

export const useCompanyUsers = (companyId: string) => {
    return useQuery<IUser[]>({
        queryKey: [USERS_QUERY_KEY],
        queryFn: () => getUsersByCompanyId(companyId),
        enabled: !!companyId,
        staleTime: 30 * 60 * 1000,
    });
};
