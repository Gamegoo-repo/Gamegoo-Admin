import React from "react";
import { theme } from "../../styles/theme";
import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "default";
  label: string;
  width?: string;
  height?: string;
  icon?: string;
  fontSize?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    variant = "default",
    label,
    width = "100%",
    height = "auto",
    icon,
    fontSize,
    onClick,
    disabled = false,
  } = props;

  return (
    <StyledButton
      type="submit"
      className={variant}
      onClick={onClick}
      disabled={disabled}
      $width={width}
      $height={height}
      $fontsize={fontSize}
    >
      {icon && <img src={icon} width={24} height={24} />}
      {label}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $width?: string;
  $height?: string;
  $fontsize?: string;
}>`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "auto"};
  border-radius: 4px;
  color: ${theme.colors.white};
  ${theme.fonts.bold14};
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 200ms, background-color 200ms;

  &.primary {
    background: ${theme.colors.violet600};
    color: ${theme.colors.white};
    &:disabled {
      background: ${theme.colors.gray100};
    }
  }
  &.secondary {
    background: ${theme.colors.violet100};
    color: ${theme.colors.violet600};
    &:hover:not(:disabled) {
      background: ${theme.colors.violet200};
    }
    &:disabled {
      background: ${theme.colors.gray100};
      color: ${theme.colors.white};
    }
  }
  &.default {
    background: ${theme.colors.white};
    border: 2px solid ${theme.colors.violet600};
    color: ${theme.colors.violet600};
    ${(props) => props.theme.fonts.semiBold14};
    &:hover:not(:disabled) {
      border: 1px solid ${theme.colors.gray800};
      color: ${theme.colors.gray800};
    }
    &:disabled {
      border: 1px solid ${theme.colors.gray300};
      color: ${theme.colors.gray300};
    }
  }

  ${({ $fontsize }) => $fontsize && `font-size: ${$fontsize};`}
`;
