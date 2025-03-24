import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DropdownOption } from "../../constants/dropdown";
import { theme } from "../../styles/theme";

type DropdownProps = {
  label: string;
  options: DropdownOption[];
  onSelect?: (option: DropdownOption) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option.label);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={ref}>
      <DropdownButton onClick={toggleDropdown}>
        {selected}
        <img src="/assets/icons/arrow_down.svg" width={24} height={24} />
      </DropdownButton>
      <DropdownMenu open={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 12px;
  border-radius: 4px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray800};
  color: ${theme.colors.gray800};
  ${theme.fonts.regular14};
`;

const DropdownMenu = styled.ul<{ open: boolean }>`
  width: 156px;
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: 110%;
  right: 0;
  border-radius: 4px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray800};
  color: ${theme.colors.gray800};
  ${theme.fonts.regular14};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 4px;
  z-index: 999;
`;

const DropdownItem = styled.li`
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.gray100};
  }
`;
