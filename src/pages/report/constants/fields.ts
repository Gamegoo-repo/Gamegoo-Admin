import { FieldConfig } from "@/types/filter/filter";

import {
  BAN_TYPES,
  IS_DELETED_OPTIONS,
  REPORT_PATHS,
  REPORT_TYPES,
} from "./filterOptions";

export const FIELDS: FieldConfig[] = [
  {
    key: "reportedMemberKeyword",
    type: "input",
    label: "피신고자 검색",
    placeholder: "게임명, 태그, 게임명#태그 형식 지원",
  },
  {
    key: "reporterKeyword",
    type: "input",
    label: "신고자 검색",
    placeholder: "게임명, 태그, 게임명#태그 형식 지원",
  },
  {
    key: "reportPaths",
    type: "dropdown",
    label: "신고 경로",
    options: REPORT_PATHS,
  },
  {
    key: "reportTypes",
    type: "dropdown",
    label: "신고 사유",
    options: REPORT_TYPES,
  },
  {
    key: "contentKeyword",
    type: "input",
    label: "신고 내용 검색",
    placeholder: "신고 내용으로 검색",
  },
  {
    key: "dateRange",
    type: "calendar",
    label: "신고 날짜 범위",
  },
  {
    key: "reportCount",
    type: "range",
    label: "누적 신고 횟수",
  },
  {
    key: "banTypes",
    type: "dropdown",
    label: "제재 상태",
    options: BAN_TYPES,
  },
  {
    key: "isDeleted",
    type: "dropdown",
    label: "게시물 삭제 여부",
    options: IS_DELETED_OPTIONS,
  },
];
