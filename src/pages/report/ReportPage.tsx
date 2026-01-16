import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { Title } from "@/components/common";
import Table from "@/components/table/Table";
import { useReportsQuery } from "@/hooks/api/reports/useReportsQuery";
import {
  mapReportToTableRow,
  ReportTableRow,
} from "@/pages/report/utils/report.mapper";

import { TopFilterContainer } from "./components";
import PostDetailModal from "./components/post-detail-modal/PostDetailModal";
import { getReportTableColumns } from "./constants";
import { getFilterParams } from "./utils";

const ReportPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const params = useMemo(() => getFilterParams(searchParams), [searchParams]);
  
  const { data = { reports: [], totalPages: 0 } } = useReportsQuery(params);

  const tableData: ReportTableRow[] = useMemo(
    () => data.reports.map(mapReportToTableRow),
    [data.reports]
  );

  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  const checkedReportIds = useMemo(() => Array.from(checkedIds), [checkedIds]);

  const handleCheck = useCallback((reportId: number) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);

      if (next.has(reportId)) {
        next.delete(reportId);
      } else {
        next.add(reportId);
      }

      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setCheckedIds((prev) =>
      prev.size === tableData.length
        ? new Set()
        : new Set(tableData.map((row) => row.reportId))
    );
  }, [tableData]);

  const handlePageChange = useCallback(
    (page: number) => {
      const next = new URLSearchParams(searchParams);
      next.set("page", String(page));
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const [selected, setSelected] = useState<{
    reportId: number;
    postId: number;
  } | null>(null);

  const handleShowPostDetail = useCallback((id: number) => {
    setSelected({ reportId: id, postId: id });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected(null);
  }, []);

  const tableColumns = useMemo(
    () =>
      getReportTableColumns({
        onShowPostDetail: handleShowPostDetail,
      }),
    [handleShowPostDetail]
  );

  return (
    <>
      <Layout>
        <Title title="신고 유저 목록" />

        <TopFilterContainer
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          checkedReportIds={checkedReportIds}
          totalElements={data.totalElements}
        />

        <Table
          data={tableData}
          columns={tableColumns}
          currentPage={currentPage}
          totalPages={data.totalPages}
          checkedItems={tableData.map((row) => checkedIds.has(row.reportId))}
          onPageChange={handlePageChange}
          onSelectAll={handleSelectAll}
          onCheck={(index: number) => handleCheck(tableData[index].reportId)}
        />
      </Layout>

      <PostDetailModal
        isOpen={!!selected}
        reportId={selected?.reportId}
        postId={selected?.postId}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ReportPage;

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px;
  gap: 24px;
  overflow-y: auto;
`;
