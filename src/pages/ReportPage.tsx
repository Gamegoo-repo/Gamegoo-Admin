// import { useParams } from "react-router-dom";
import Title from "../components/common/Title";
import styled from "styled-components";
import { useState } from "react";
import Table from "../components/table/Table";
import { COLUMNS } from "../constants/table/columns";
import Label from "../components/common/Label";
import { TABLE_DUMMY } from "../constants/table/dummy";
import { theme } from "../styles/theme";
import Button from "../components/common/Button";
import Dropdown from "../components/common/Dropdown";
import { ACCOUNT, SORT } from "../constants/dropdown";
import Input from "../components/common/Input";
import { LABELS } from "../constants/filter";

const ReportPage = () => {
  // const { page } = useParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 20;
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <Layout>
      <Title title="신고 유저 목록" />
      <TopContainer>
        <TopWrapper>
          <Total>
            전체 <Count>32</Count>
          </Total>
          <Filter>
            <Button
              variant="default"
              label="필터"
              icon={`/assets/icons/filter${
                isFilterOpen ? "_purple" : "_gray"
              }.svg`}
              width="69px"
              height="32px"
              selected={isFilterOpen}
              onClick={handleFilterToggle}
            />
            <Dropdown label="계정 제재" options={ACCOUNT} />
            <Dropdown label="최신순" options={SORT} />
          </Filter>
        </TopWrapper>
        {isFilterOpen && (
          <FilterContainer>
            {LABELS.map((label, index) => (
              <Input
                key={index}
                inputType="input"
                label={label}
                value=""
                onChange={() => {}}
                placeholder="내용을 입력해 주세요"
              />
            ))}
            <Button variant="primary" label="검색" width="100%" height="33px" />
          </FilterContainer>
        )}
      </TopContainer>
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

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const TopWrapper = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Total = styled.div`
  color: ${theme.colors.gray700};
  ${theme.fonts.regular14}
`;

const Count = styled.span`
  color: ${theme.colors.gray600};
`;

const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 40px;
  row-gap: 24px;
  padding: 20px;
  background: ${theme.colors.violet200};
  border-radius: 8px;
  align-items: flex-end;
`;
