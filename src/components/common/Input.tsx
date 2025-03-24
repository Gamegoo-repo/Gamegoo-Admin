import styled from "styled-components";
import { theme } from "../../styles/theme";

interface InputProps {
  inputType?: "input" | "calendar" | "dropdown";
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLeng?: number;
}

const Input = (props: InputProps) => {
  const {
    inputType = "input",
    id,
    label,
    value,
    onChange,
    placeholder,
    disabled,
    onFocus,
    onBlur,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  text-align: left;
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.semiBold14}
`;

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 5.5px 12px;
  border-radius: 4px;
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.regular14}

  &:focus {
    outline: none;
  }

  &:disabled {
    background: ${theme.colors.gray100};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;
