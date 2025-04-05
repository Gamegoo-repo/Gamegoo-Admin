import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox checked={checked} onChange={onChange} type="checkbox" />
      <StyledCheckbox checked={checked}>
        {checked && (
          <CheckMark src="/assets/icons/check_mark.svg" width={8} height={6} />
        )}
      </StyledCheckbox>
    </CheckboxWrapper>
  );
};

export default Checkbox;

const CheckboxWrapper = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.violet600 : theme.colors.white};
  border: ${({ checked, theme }) =>
    checked ? "none" : `1px solid ${theme.colors.gray400}`};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;
`;

const CheckMark = styled.img``;
