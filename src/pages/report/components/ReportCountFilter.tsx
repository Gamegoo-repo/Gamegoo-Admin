import styled from "styled-components";

import Checkbox from "../../../components/common/Checkbox";
import { theme } from "../../../styles/theme";

interface ReportCountFilterProps {
  label: string;
  exactValue: string;
  minValue: string;
  maxValue: string;
  isRange: boolean;
  onExactChange: (value: string) => void;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onRangeToggle: (isRange: boolean) => void;
}

const ReportCountFilter = ({
  label,
  exactValue,
  minValue,
  maxValue,
  isRange,
  onExactChange,
  onMinChange,
  onMaxChange,
  onRangeToggle,
}: ReportCountFilterProps) => {
  const handleExactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onExactChange(e.target.value);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMinChange(e.target.value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMaxChange(e.target.value);
  };

  const handleRangeToggle = () => {
    // 범위 모드 전환 시 값들 초기화
    if (!isRange) {
      // exact -> range 모드로 전환 시 exact 값을 min으로 복사하고 exact 초기화
      if (exactValue) {
        onMinChange(exactValue);
        onExactChange("");
      }
    } else {
      // range -> exact 모드로 전환 시 min 값을 exact로 복사하고 min/max 초기화
      if (minValue) {
        onExactChange(minValue);
      }
      onMinChange("");
      onMaxChange("");
    }
    onRangeToggle(!isRange);
  };

  return (
    <Wrapper>
      <StyledLabel>{label}</StyledLabel>
      <RangeArea>
        <InputWrapper>
          {isRange ? (
            <>
              <StyledInput
                name="min"
                type="number"
                value={minValue}
                onChange={handleMinChange}
                placeholder="최소값"
              />
              <RangeSeparator>~</RangeSeparator>
              <StyledInput
                name="max"
                type="number"
                value={maxValue}
                onChange={handleMaxChange}
                placeholder="최대값"
              />
            </>
          ) : (
            <StyledInput
              name="exact"
              type="number"
              value={exactValue}
              onChange={handleExactChange}
              placeholder="정확한 횟수"
            />
          )}
        </InputWrapper>
        <CheckboxWrapper>
          <Checkbox checked={isRange} onChange={handleRangeToggle} />
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
