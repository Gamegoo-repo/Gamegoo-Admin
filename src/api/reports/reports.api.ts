import { authAxios } from "@/api/lib/axios.auth";

export interface GetReportsParams {
  page: number;
  [key: string]: any;
}

export const getReportsApi = async (params: GetReportsParams) => {
  const res = await authAxios.get("/api/v2/report/list", { params });
  return res.data.data;
};

export const deleteReportedPostApi = (reportId: number) =>
  authAxios.delete(`/api/v2/report/${reportId}/post`);