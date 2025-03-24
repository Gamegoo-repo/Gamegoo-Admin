export type DropdownOption = {
  id: number;
  label: string;
};

export const ACCOUNT: DropdownOption[] = [
  {
    id: 0,
    label: "경고",
  },
  {
    id: 1,
    label: "1일 정지",
  },
  {
    id: 2,
    label: "3일 정지",
  },
  {
    id: 3,
    label: "5일 정지",
  },
  {
    id: 4,
    label: "7일 정지",
  },
  {
    id: 5,
    label: "1주 정지",
  },
  {
    id: 6,
    label: "2주 정지",
  },
  {
    id: 7,
    label: "한달 정지",
  },
  {
    id: 8,
    label: "영구 정지",
  },
];

export const SORT: DropdownOption[] = [
  {
    id: 0,
    label: "최신순",
  },
  {
    id: 1,
    label: "오래된순",
  },
];
