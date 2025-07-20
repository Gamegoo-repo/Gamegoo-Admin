import { useState } from "react";
import styled from "styled-components";

import { Label, Title } from "@/components/common";
import Table from "@/components/table/Table";
import { COLUMNS } from "@/constants/table/columns";
import { TABLE_DUMMY } from "@/constants/table/dummy";

import TopFilterContainer from "./components/TopFilterContainer";

const ReportPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Title title="신고 유저 목록" />
      <TopFilterContainer />
      <Table
        data={TABLE_DUMMY}
        columns={COLUMNS}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Label variant="purple" label="3일 정지" />
      <Label variant="green" label="정상" />
      <Label variant="red" label="영구 정지" />
      <Label variant="gray" label="스팸 홍보 / 도매글" />
    </Layout>
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
`;
