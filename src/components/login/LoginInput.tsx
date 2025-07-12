import styled from "styled-components";
import { theme } from "../../styles/theme";

interface InputProps {
  inputType?: "input" | "password";
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isvalid?: null | boolean;
  disabled?: boolean;
  height?: string;
  errorMsg?: string;
  checkIcon?: boolean;
  borderRadius?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholderFontSize?: string;
}

const LoginInput = (props: InputProps) => {
  const {
    inputType = "input",
    value,
    onChange,
    onKeyDown,
    placeholder,
    isvalid,
    disabled,
    height,
    errorMsg = "사용불가",
    checkIcon = true,
    borderRadius,
    onFocus,
    onBlur,
    placeholderFontSize,
  } = props;

  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <Element>
      <Box>
        <StyledInput
          type={inputType}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          $isvalid={isvalid}
          disabled={disabled}
          $borderradius={borderRadius || "15px"}
          height={height}
          onFocus={onFocus}
          onBlur={onBlur}
          $placeholderFontSize={placeholderFontSize}
        />
        {isvalid !== undefined && (
          <Valid>
            {isvalid === true && checkIcon === true && (
              <img
                src="/assets/icons/check.svg"
                width={19}
                height={13}
                alt="check"
              />
            )}
            {isvalid === false && <Error>{errorMsg}</Error>}
          </Valid>
        )}
      </Box>
    </Element>
  );
};

export default LoginInput;

const Element = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const StyledInput = styled.input<{
  $borderradius: string;
  $isvalid?: null | boolean;
  $placeholderFontSize?: string;
}>`
  width: 100%;
  height: ${({ height }) => (height ? height : "58px")};
  padding: 11px 20px;
  border-radius: ${({ $borderradius }) =>
    $borderradius ? $borderradius : "15px"};
  border: ${({ $isvalid }) =>
    $isvalid === undefined
      ? `1px solid ${theme.colors.gray300}`
      : $isvalid === true
      ? `1px solid ${theme.colors.violet300}`
      : `1px solid ${theme.colors.red600}`};
  color: ${theme.colors.gray900};
  ${(props) => props.theme.fonts.medium16}

  &:focus {
    outline: none;
    border: ${({ $isvalid }) =>
      $isvalid === undefined && `1px solid ${theme.colors.violet300}`};
  }

  &:disabled {
    background: ${theme.colors.violet500};
  }

  &::placeholder {
    color: ${theme.colors.gray600};
    font-size: ${({ $placeholderFontSize }) =>
      $placeholderFontSize ? $placeholderFontSize : "16px"};
  }
`;

const Box = styled.div`
  position: relative;
`;

const Valid = styled.div`
  position: absolute;
  top: 50%;
  right: 23px;
  transform: translate(0, -50%);
`;

const Error = styled.div`
  color: ${theme.colors.red600};
  ${(props) => props.theme.fonts.regular12}
`;
