import { deleteReportedPostApi } from "@/api/reports/reports.api";
import { querykeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteReportedPostMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: number) =>
      deleteReportedPostApi(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [querykeys.Report] });
      onSuccess?.();
    },
  });
};