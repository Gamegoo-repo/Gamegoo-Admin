import type { MainPEnum } from "@/@generated/types";

export const POSITIONS = [
  { label: "주 포지션" },
  { label: "부 포지션" },
  { label: "내가 찾는 포지션" },
];

export const POSITION = [
  { id: 1, key: "ANY" as MainPEnum, image: "all" },
  { id: 2, key: "TOP" as MainPEnum, image: "top" },
  { id: 3, key: "JUNGLE" as MainPEnum, image: "jungle" },
  { id: 4, key: "MID" as MainPEnum, image: "mid" },
  { id: 5, key: "ADC" as MainPEnum, image: "one_deal" },
  { id: 0, key: "SUP" as MainPEnum, image: "supporter" },
];
