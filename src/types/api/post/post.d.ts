import { GameModeEnum, MainPEnum } from "@/@generated/types";

export interface PostDetail {
  memberId: number;
  gameName: string;
  tag: string;
  profileImage: number;
  mannerLevel: number;

  soloTier?: string;
  soloRank?: number;
  freeTier?: string;
  freeRank?: number;

  gameMode: GameModeEnum;
  mainP?: MainPEnum | null;
  subP?: MainPEnum | null;
  wantP?: MainPEnum[] | null;

  championStatsResponseList: any[];
  winRate?: number;
  gameStyles: number[];
  contents: string;
}