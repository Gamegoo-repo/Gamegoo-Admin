export const REPORT_PATHS = [
  { id: 0, label: "전체", value: "" },
  { id: 1, label: "게시판", value: "BOARD" },
  { id: 2, label: "채팅", value: "CHAT" },
  { id: 3, label: "프로필", value: "PROFILE" },
];

export const REPORT_TYPES = [
  { id: 0, label: "전체", value: "" },
  { id: 1, label: "스팸", value: "1" },
  { id: 2, label: "불법정보", value: "2" },
  { id: 3, label: "성희롱", value: "3" },
  { id: 4, label: "욕설/혐오", value: "4" },
  { id: 5, label: "개인정보노출", value: "5" },
  { id: 6, label: "불쾌한표현", value: "6" },
];

export const IS_DELETED_OPTIONS = [
  { id: 0, label: "전체", value: "" },
  { id: 1, label: "삭제됨", value: "true" },
  { id: 2, label: "미삭제", value: "false" },
];

export const BAN_TYPES = [
  { id: 0, label: "전체", value: "" },
  { id: 1, label: "제재 없음", value: "NONE" },
  { id: 2, label: "경고", value: "WARNING" },
  { id: 3, label: "1일 정지", value: "BAN_1D" },
  { id: 4, label: "3일 정지", value: "BAN_3D" },
  { id: 5, label: "5일 정지", value: "BAN_5D" },
  { id: 6, label: "7일 정지", value: "BAN_7D" },
  { id: 7, label: "1주 정지", value: "BAN_1W" },
  { id: 8, label: "2주 정지", value: "BAN_2W" },
  { id: 9, label: "1개월 정지", value: "BAN_1M" },
  { id: 10, label: "영구 정지", value: "PERMANENT" },
];
