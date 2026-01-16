import { BanTypeEnum } from "@/@generated/types";
import { processReportApi } from "@/api/reports/reports.api";
import { querykeys } from "@/constants/querykeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ProcessReportsPayload = {
  reportIds: number[];
  banType: BanTypeEnum;
};

export const useProcessReportsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportIds, banType }: ProcessReportsPayload) => {
      await Promise.all(reportIds.map((id) => processReportApi(id, banType)));
    },

    // Optimistic Update 시작
    onMutate: async ({ reportIds, banType }) => {
      await queryClient.cancelQueries({ queryKey: [querykeys.Report] });

      // rollback용 스냅샷 저장
      const previousQueries =
        queryClient.getQueriesData<any>({ queryKey: [querykeys.Report] });

      // 캐시 수정
      previousQueries.forEach(([key, oldData]) => {
        if (!oldData?.data?.reports) return;

        const nextReports = oldData.data.reports.map((report: any) => {
          if (!reportIds.includes(report.reportId)) return report;

          return {
            ...report,
            banType,
          };
        });

        queryClient.setQueryData(key, {
          ...oldData,
          data: {
            ...oldData.data,
            reports: nextReports,
          },
        });
      });

      // rollback context 리턴
      return { previousQueries };
    },

    // 실패하면 롤백
    onError: (_error, _variables, context) => {
      if (!context?.previousQueries) return;

      context.previousQueries.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });
    },

    //성공/실패 상관없이 서버 기준으로 맞추기
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [querykeys.Report] });
    },
  });
};