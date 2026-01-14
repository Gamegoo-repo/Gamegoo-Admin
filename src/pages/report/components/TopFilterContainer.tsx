import { useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import { Button, Dropdown } from "@/components/common";
import { ACCOUNT, SORT } from "@/pages/report/constants/dropdown";
import { theme } from "@/styles/theme";
import { DropdownOption } from "@/types/filter/filter";

import AdvancedFilter from "./AdvancedFilter";
import { authAxios } from "@/api/lib/axios.auth";

interface TopFilterContainerProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  checkedReportIds: number[];
  totalElements: number
}

const TopFilterContainer = ({
  searchParams,
  setSearchParams,
  checkedReportIds,
  totalElements
}: TopFilterContainerProps) => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState<boolean>(false);
  
  const currentSort = searchParams.get("sortOrder") ?? "LATEST";

  const currentSortLabel =
  SORT.find(option => option.value === currentSort)?.label ?? "최신순"

  const queryClient = useQueryClient();

  const { mutate: processReports } = useMutation({
    mutationFn: ({
      reportIds,
      banType,
    }: {
      reportIds: number[];
      banType: string;
    }) => {
      const promises = reportIds.map((reportId) =>
        authAxios.put(`/api/v2/report/${reportId}/process`, { banType })
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report"] });
    },
  });

  const handleAdvancedFilterOpen = () => {
    setIsAdvancedFilterOpen(!isAdvancedFilterOpen);
  };

  const handleAccountAction = (option: DropdownOption) => {
    if (checkedReportIds.length === 0) {
      alert("처리할 신고를 선택해주세요.");
      return;
    }

    processReports({ reportIds: checkedReportIds, banType: option.value });
  };
  
  const handleSortChange = (option: DropdownOption) => {
    const next = new URLSearchParams(searchParams);
    next.set("sortOrder", option.value);
    next.set("page", "1"); // 정렬 변경 시 페이지 초기화 권장
    setSearchParams(next);
  };

  return (
    <TopContainer>
      <TopWrapper>
        <Total>
          전체 <Count>{totalElements}</Count>
        </Total>
        <Filter>
          <Button
            variant="default"
            label="필터"
            icon={`/assets/icons/filter${isAdvancedFilterOpen ? "_purple" : "_gray"}.svg`}
            width="69px"
            height="32px"
            selected={isAdvancedFilterOpen}
            onClick={handleAdvancedFilterOpen}
          />
          <Dropdown
            label={"계정 제재"}
            options={ACCOUNT}
            onSelect={handleAccountAction}
          />
          <Dropdown
            label={currentSortLabel}
            options={SORT}
            onSelect={handleSortChange}
          />
        </Filter>
      </TopWrapper>
      <AdvancedFilter
        isOpen={isAdvancedFilterOpen}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </TopContainer>
  );
};

export default TopFilterContainer;

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
