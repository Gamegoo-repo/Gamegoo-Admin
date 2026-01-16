import { DropdownOption } from "@/types/filter/filter";

export const ACCOUNT: readonly DropdownOption[] = Object.freeze([
  {
    id: 0,
    label: "경고",
    value: "WARNING",
  },
  {
    id: 1,
    label: "1일 정지",
    value: "BAN_1D",
  },
  {
    id: 2,
    label: "3일 정지",
    value: "BAN_3D",
  },
  {
    id: 3,
    label: "5일 정지",
    value: "BAN_5D",
  },
  {
    id: 4,
    label: "7일 정지",
    value: "BAN_7D",
  },
  {
    id: 5,
    label: "1주 정지",
    value: "BAN_1W",
  },
  {
    id: 6,
    label: "2주 정지",
    value: "BAN_2W",
  },
  {
    id: 7,
    label: "한달 정지",
    value: "BAN_1M",
  },
  {
    id: 8,
    label: "영구 정지",
    value: "PERMANENT",
  },
  {
    id: 9,
    label: '재재 헤제',
    value: "NONE"
  }
]);

export const SORT: readonly DropdownOption[] = Object.freeze([
  {
    id: 0,
    label: "최신순",
    value: "LATEST",
  },
  {
    id: 1,
    label: "오래된순",
    value: "OLDEST",
  },
]);