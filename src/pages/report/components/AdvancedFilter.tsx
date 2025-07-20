import { useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styled from "styled-components";

import { Button, Input } from "@/components/common";
import ReportCountFilter from "@/pages/report/components/ReportCountFilter";
import { theme } from "@/styles/theme";

import { FilterValues } from "../../../types/filter/filter";
import { FIELDS } from "../constants/fields";

interface AdvancedFilterProps {
  isOpen: boolean;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const AdvancedFilter = ({
  isOpen,
  searchParams,
  setSearchParams,
}: AdvancedFilterProps) => {
  const [localFilters, setLocalFilters] = useState<FilterValues>(() => {
    const initialFilters: FilterValues = {};
    FIELDS.forEach((field) => {
      const value = searchParams.get(field.key);
      if (value) {
        initialFilters[field.key] = value;
      }
    });

    const reportCountExact = searchParams.get("reportCount_exact");
    const reportCountMin = searchParams.get("reportCount_min");
    const reportCountMax = searchParams.get("reportCount_max");
    const reportCountRange = searchParams.get("reportCount_range");

    if (reportCountExact)
      initialFilters["reportCount_exact"] = reportCountExact;
    if (reportCountMin) initialFilters["reportCount_min"] = reportCountMin;
    if (reportCountMax) initialFilters["reportCount_max"] = reportCountMax;
    if (reportCountRange)
      initialFilters["reportCount_range"] = reportCountRange;

    return initialFilters;
  });

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);

    FIELDS.forEach((field) => {
      newParams.delete(field.key);
    });
    newParams.delete("reportCount_exact");
    newParams.delete("reportCount_min");
    newParams.delete("reportCount_max");
    newParams.delete("reportCount_range");

    Object.entries(localFilters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

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
              label={field.label}
              exactValue={localFilters[`${field.key}_exact`] || ""}
              minValue={localFilters[`${field.key}_min`] || ""}
              maxValue={localFilters[`${field.key}_max`] || ""}
              isRange={localFilters[`${field.key}_range`] === "true"}
              onExactChange={(value: string) =>
                handleFilterChange(`${field.key}_exact`, value)
              }
              onMinChange={(value: string) =>
                handleFilterChange(`${field.key}_min`, value)
              }
              onMaxChange={(value: string) =>
                handleFilterChange(`${field.key}_max`, value)
              }
              onRangeToggle={(isRange: boolean) =>
                handleFilterChange(`${field.key}_range`, isRange ? "true" : "")
              }
            />
          );
        }

        return (
          <Input
            key={index}
            inputType={field.type}
            label={field.label}
            value={localFilters[field.key] || ""}
            onChange={(val) => handleFilterChange(field.key, val)}
            placeholder={field.placeholder || "내용을 입력해 주세요"}
            options={field.options || []}
          />
        );
      })}
      <Button
        variant="primary"
        label="검색"
        width="100%"
        height="33px"
        onClick={handleSearch}
      />
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
