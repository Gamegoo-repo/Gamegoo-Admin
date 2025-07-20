import { useState } from "react";
import styled from "styled-components";

import { Button, Input } from "@/components/common";
import ReportCountFilter from "@/components/filter/ReportCountFilter";
import { theme } from "@/styles/theme";

import { FIELDS } from "../../../constants/filter";
import { FilterValues, ReportCountRange } from "../../../types/filter/filter";

const AdvancedFilter = ({ isOpen }: { isOpen: boolean }) => {
  // 필터 입력 상태
  const [formValues, setFormValues] = useState<FilterValues>({});
  const [reportCountRange, setReportCountRange] = useState<ReportCountRange>({
    min: "",
    max: "",
  });
  const [isRange, setIsRange] = useState<boolean>(false);

  if (!isOpen) {
    return null;
  }

  return (
    <FilterContainer>
      {FIELDS.map((field, index) => {
        if (field.type === "range") {
          return (
            <ReportCountFilter
              key={index}
              label={field.key}
              value={reportCountRange}
              isRange={isRange}
              onChange={setReportCountRange}
              onToggleRange={() => setIsRange(!isRange)}
            />
          );
        }

        return (
          <Input
            key={index}
            inputType={field.type}
            label={field.key}
            value={formValues[field.key] || ""}
            onChange={(val) =>
              setFormValues({ ...formValues, [field.key]: val })
            }
            placeholder="내용을 입력해 주세요"
            options={field.options || []}
          />
        );
      })}
      <Button variant="primary" label="검색" width="100%" height="33px" />
    </FilterContainer>
  );
};

export default AdvancedFilter;

const FilterContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 40px;
  row-gap: 24px;
  padding: 20px;
  background: ${theme.colors.violet200};
  border-radius: 8px;
  align-items: flex-end;
`;
