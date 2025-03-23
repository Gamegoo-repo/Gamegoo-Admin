import styled from "styled-components";
import { theme } from "../../styles/theme";

interface LabelProps {
  variant: "purple" | "green" | "red" | "gray";
  label: string;
}

const Label = (props: LabelProps) => {
  const { variant, label } = props;
  return <LabelBox className={variant}>{label}</LabelBox>;
};

export default Label;

const LabelBox = styled.div`
  min-width: 62px;
  width: auto;
  height: 21px;
  border-radius: 4px;
  padding: 4px 6.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.fonts.semiBold13};
  white-space: nowrap;

  &.purple {
    background: ${theme.colors.violet100};
    color: ${theme.colors.violet600};
  }
  &.green {
    background: ${theme.colors.green100};
    color: ${theme.colors.green600};
  }
  &.red {
    background: ${theme.colors.red100};
    color: ${theme.colors.red600};
  }
  &.gray {
    min-width: 0;
    padding: 4px 6px;
    background: ${theme.colors.gray100};
    color: ${theme.colors.gray800};
  }
`;
