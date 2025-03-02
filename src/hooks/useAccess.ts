import {useQuery} from "@tanstack/react-query";
import {getIp} from "../api/getIp.ts";

export const useAccess = (ip?: string) => {
    return useQuery<boolean, Error>({
        queryKey: ['access'],
        queryFn: async () => {
            if (!ip) return Promise.reject(new Error("Ip is required"));
            const result = await getIp()
            if (!result) {
                throw new Error("Getting ip error");
            }
            return result === ip;
        },
        staleTime: 1000 * 60 * 10,
        enabled: !!ip
    });
}