export const getFilterParams = (searchParams: URLSearchParams) => {
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;

  const params: any = {
    page: currentPage - 1, // API는 0-based
    size: pageSize,
    sortOrder: searchParams.get("sortOrder") ?? "LATEST",
  };

  // 필터 값들 추가
  if (searchParams.get("reportedMemberKeyword"))
    params.reportedMemberKeyword = searchParams.get("reportedMemberKeyword");
  if (searchParams.get("reporterKeyword"))
    params.reporterKeyword = searchParams.get("reporterKeyword");
  if (searchParams.get("contentKeyword"))
    params.contentKeyword = searchParams.get("contentKeyword");
  if (searchParams.get("reportPaths"))
    params.reportPaths = searchParams.get("reportPaths");
  if (searchParams.get("reportTypes"))
    params.reportTypes = searchParams.get("reportTypes");
  if (searchParams.get("startDate"))
    params.startDate = searchParams.get("startDate");
  if (searchParams.get("endDate")) params.endDate = searchParams.get("endDate");
  if (searchParams.get("isDeleted"))
    params.isDeleted = searchParams.get("isDeleted");
  if (searchParams.get("banTypes"))
    params.banTypes = searchParams.get("banTypes");

  // 신고 횟수 필터 처리 (exact 또는 min/max)
  const reportCountExact = searchParams.get("reportCount_exact");
  const reportCountMin = searchParams.get("reportCount_min");
  const reportCountMax = searchParams.get("reportCount_max");

  if (reportCountExact) {
    params.reportCountExact = reportCountExact;
  } else {
    if (reportCountMin) params.reportCountMin = reportCountMin;
    if (reportCountMax) params.reportCountMax = reportCountMax;
  }

  return params;
};
