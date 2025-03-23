// import { useParams } from "react-router-dom";
import Title from "../components/common/Title";
import styled from "styled-components";
import { useState } from "react";
import Table from "../components/table/Table";
import { COLUMNS } from "../constants/table/columns";
import Label from "../components/common/Label";

const data = [
  {
    id: 1,
    state: "정상",
    name: "하이",
    reason: "스팸 홍보 / 도배글",
    details: "게임 중 팀원에게 인신공격성 발언",
    reporter: "신고자",
    date: "날짜",
    count: 1,
    page: "프로필",
  },
  {
    id: 2,
    state: "한정 정지",
    name: "ㅎㅎ",
    reason: "불법 정보 포함",
    details: "게임 중 팀원에게 인신공격성 발언",
    reporter: "신고자",
    date: "날짜",
    count: 1,
    page: "프로필",
  },
];

const ReportPage = () => {
  // const { page } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Layout>
      <Title title="신고 유저 목록" />
      <Table
        data={data}
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
`;
