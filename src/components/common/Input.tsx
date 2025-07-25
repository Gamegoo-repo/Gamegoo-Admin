import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { ko } from "date-fns/locale";
import styled from "styled-components";

import { theme } from "../../styles/theme";
import { FieldType } from "../../types/filter/filter";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Option {
  id: number;
  label: string;
  value: string;
}

interface InputProps {
  inputType?: FieldType;
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  options?: Option[];
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
    options = [],
  } = props;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [calendarRange, setCalendarRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const formatDate = (date: Date | undefined) =>
    date ? date.toISOString().split("T")[0].replace(/-/g, ".") : "";

  const handleCalendarChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setCalendarRange(ranges.selection);
    onChange(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    setIsCalendarOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}

      {inputType === "calendar" ? (
        <CalendarWrapper>
          <CalendarInput
            readOnly
            value={value}
            placeholder="날짜 선택"
            onClick={toggleCalendar}
          />
          <CalendarIcon src="/assets/icons/calendar.svg" alt="calendar" />
          {isCalendarOpen && (
            <CalendarDropdown>
              <DateRange
                onChange={handleCalendarChange}
                moveRangeOnFirstSelection={false}
                ranges={[calendarRange]}
                locale={ko}
                months={2}
                direction="horizontal"
              />
            </CalendarDropdown>
          )}
        </CalendarWrapper>
      ) : inputType === "dropdown" ? (
        <SelectWrapper>
          <StyledSelect
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </StyledSelect>
          <DropdownIcon src="/assets/icons/dropdown.svg" alt="arrow" />
        </SelectWrapper>
      ) : (
        <StyledInput
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
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

// calendar
const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CalendarInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 5.5px 36px 5.5px 12px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray300};
  color: ${theme.colors.gray800};
  background-color: ${theme.colors.white};
  ${theme.fonts.regular14};
  cursor: pointer;

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const CalendarIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 8px;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const CalendarDropdown = styled.div`
  position: absolute;
  top: 40px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
`;

// dropdown
const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 32px;
  padding: 5.5px 36px 5.5px 12px;
  border-radius: 4px;
  color: ${theme.colors.gray800};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray300};
  appearance: none;
  outline: none;
  ${theme.fonts.regular14};

  &:disabled {
    background: ${theme.colors.gray100};
  }
`;

const DropdownIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 8px;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  pointer-events: none;
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
