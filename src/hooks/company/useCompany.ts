import {useQuery} from "@tanstack/react-query";

import {ICompany} from "../../types/company";

import {COMPANY_QUERY_KEY} from "../../constants.ts";

import {getCompanyById} from "../../api/companies.ts";

export const useCompany = (companyId?: string) => {
    return useQuery<ICompany, Error>({
        queryKey: [COMPANY_QUERY_KEY],
        queryFn: async () => {
            if (!companyId) return Promise.reject(new Error("Company ID is required"));
            return await getCompanyById(companyId);
        },
        staleTime: 1000 * 60 * 10,
        enabled: !!companyId,
    });
};