import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types/user";
import { AUTH_QUERY_KEY } from "../constants.ts";
import { getUserById } from "../api/users.ts";

export const useAuth = (companyId?: string, userId?: string, userData?: IUser) => {
    return useQuery<IUser, Error>({
        queryKey: [AUTH_QUERY_KEY],
        queryFn: async () => {
            if (!companyId || !userId || !userData) {
                throw new Error("Company ID, User ID, and default user data are required");
            }
            return await getUserById(companyId, userId, userData);
        },
        staleTime: 1000 * 60 * 10,
        enabled: Boolean(companyId && userId && userData),
    });
};
