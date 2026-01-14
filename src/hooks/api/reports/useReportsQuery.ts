import { getReportsApi, GetReportsParams } from "@/api/reports/reports.api";
import { querykeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

export const useReportsQuery = (params: GetReportsParams) => {
    return useQuery({
        queryKey: [querykeys.Report, params],
        queryFn: () => getReportsApi(params),
        placeholderData: (previousData) => previousData,
    })
}