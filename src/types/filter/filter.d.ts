// inputType 설정용
export type FieldType = "input" | "dropdown" | "calendar" | "range";

// 드롭다운 옵션
export interface DropdownOption {
  id: number;
  label: string;
}

// 필드 구성 정보
export interface FieldConfig {
  key: string;
  type: FieldType;
  options?: DropdownOption[]; // dropdown일 때만 사용
}

export type FilterValues = {
  [key: string]: string;
};

// 신고 누적 횟수 필터 값
export interface ReportCountRange {
  min: string;
  max: string;
}
