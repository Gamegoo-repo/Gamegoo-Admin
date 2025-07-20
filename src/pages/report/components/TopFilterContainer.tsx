import { useState } from "react";
import styled from "styled-components";

import { Button, Dropdown } from "@/components/common";
import { ACCOUNT, SORT } from "@/pages/report/constants/dropdown";
import { theme } from "@/styles/theme";

import AdvancedFilter from "./AdvancedFilter";

const TopFilterContainer = () => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] =
    useState<boolean>(false);

  const handleAdvancedFilterOpen = () => {
    setIsAdvancedFilterOpen(!isAdvancedFilterOpen);
  };

  return (
    <TopContainer>
      <TopWrapper>
        <Total>
          전체 <Count>32</Count>
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
          <Dropdown label="계정 제재" options={ACCOUNT} />
          <Dropdown label="최신순" options={SORT} />
        </Filter>
      </TopWrapper>
      <AdvancedFilter isOpen={isAdvancedFilterOpen} />
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
