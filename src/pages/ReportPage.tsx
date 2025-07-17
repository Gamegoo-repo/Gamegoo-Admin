// import { useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import Button from "../components/common/Button";
import Dropdown from "../components/common/Dropdown";
import Input from "../components/common/Input";
import Label from "../components/common/Label";
import Title from "../components/common/Title";
import ReportCountFilter from "../components/filter/ReportCountFilter";
import Table from "../components/table/Table";
import { ACCOUNT, SORT } from "../constants/dropdown";
import { FIELDS } from "../constants/filter";
import { COLUMNS } from "../constants/table/columns";
import { TABLE_DUMMY } from "../constants/table/dummy";
import { theme } from "../styles/theme";
import { FilterValues, ReportCountRange } from "../types/filter/filter";

const ReportPage = () => {
  // const { page } = useParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 20;
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // 필터 입력 상태
  const [formValues, setFormValues] = useState<FilterValues>({});
  const [reportCountRange, setReportCountRange] = useState<ReportCountRange>({
    min: "",
    max: "",
  });
  const [isRange, setIsRange] = useState<boolean>(false);

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
            {FIELDS.map((field, index) => {
              if (field.type === "range") {
                return (
                  <ReportCountFilter
                    key={index}
                    label={field.key}
                    value={reportCountRange}
                    isRange={isRange}
                    onChange={setReportCountRange}
                    onToggleRange={() => setIsRange(!isRange)}
                  />
                );
              }

              return (
                <Input
                  key={index}
                  inputType={field.type}
                  label={field.key}
                  value={formValues[field.key] || ""}
                  onChange={(val) =>
                    setFormValues({ ...formValues, [field.key]: val })
                  }
                  placeholder="내용을 입력해 주세요"
                  options={field.options || []}
                />
              );
            })}
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
