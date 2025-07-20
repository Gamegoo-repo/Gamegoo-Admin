import { useState } from "react";
import styled from "styled-components";

import Checkbox from "../../../components/common/Checkbox";
import { theme } from "../../../styles/theme";
import { ReportCountRange } from "../../../types/filter/filter";

interface ReportCountFilterProps {
  label: string;
}

const ReportCountFilter = ({ label }: ReportCountFilterProps) => {
  // exact 또는 range 선택
  const [isRange, setIsRange] = useState<boolean>(false);

  const [reportCountRange, setReportCountRange] = useState<ReportCountRange>({
    min: "",
    max: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportCountRange({
      ...reportCountRange,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <RangeArea>
        <InputWrapper>
          <StyledInput
            name="min"
            type="number"
            value={reportCountRange.min}
            onChange={handleChange}
            placeholder="회"
          />
          {isRange && (
            <>
              <RangeSeparator>~</RangeSeparator>
              <StyledInput
                name="max"
                type="number"
                value={reportCountRange.max}
                onChange={handleChange}
                placeholder="회"
              />
            </>
          )}
        </InputWrapper>
        <CheckboxWrapper>
          <Checkbox checked={isRange} onChange={() => setIsRange(!isRange)} />
          <CheckboxLabel>범위</CheckboxLabel>
        </CheckboxWrapper>
      </RangeArea>
    </Wrapper>
  );
};

export default ReportCountFilter;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  text-align: left;
  color: ${theme.colors.gray700};
  ${theme.fonts.semiBold14}
`;

const RangeArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 5.5px 12px;
  border-radius: 4px;
  color: ${theme.colors.gray800};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  ${theme.fonts.regular14};

  &::placeholder {
    color: ${theme.colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.violet600};
  }
`;

const RangeSeparator = styled.span`
  color: ${theme.colors.gray700};
  ${theme.fonts.regular14};
`;

const CheckboxWrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CheckboxLabel = styled.span`
  color: ${theme.colors.gray700};
  ${theme.fonts.regular13};
  white-space: nowrap;
`;
