import { FieldConfig } from "../types/filter/filter";

export const FIELDS: FieldConfig[] = [
  { key: "신고 대상", type: "input" },
  { key: "신고자", type: "input" },
  {
    key: "신고된 페이지",
    type: "dropdown",
    options: [
      { label: "전체", value: "" },
      { label: "게시글", value: "post" },
      { label: "댓글", value: "comment" },
      { label: "프로필", value: "profile" },
    ],
  },
  {
    key: "신고 사유",
    type: "dropdown",
    options: [
      { label: "전체", value: "" },
      { label: "욕설", value: "abusive" },
      { label: "스팸", value: "spam" },
      { label: "허위 정보", value: "false_info" },
      { label: "기타", value: "etc" },
    ],
  },
  { key: "상세 내용", type: "input" },
  { key: "접수 일시", type: "calendar" },
  { key: "신고 누적 횟수", type: "range" },
  {
    key: "계정 제재 종류",
    type: "dropdown",
    options: [
      { label: "전체", value: "" },
      { label: "경고", value: "warning" },
      { label: "1일 정지", value: "ban_1d" },
      { label: "3일 정지", value: "ban_3d" },
      { label: "7일 정지", value: "ban_7d" },
      { label: "영구 정지", value: "ban_perm" },
    ],
  },
  {
    key: "삭제된 게시글",
    type: "dropdown",
    options: [
      { label: "전체", value: "" },
      { label: "삭제됨", value: "deleted" },
      { label: "미삭제", value: "not_deleted" },
    ],
  },
];