import { MainPEnum } from "@/@generated/types";

export function checkTierAbbr(tier: string) {
  switch (tier) {
    case "IRON":
      return "I";
    case "BRONZE":
      return "B";
    case "SILVER":
      return "S";
    case "GOLD":
      return "G";
    case "PLATINUM":
      return "P";
    case "EMERALD":
      return "E";
    case "DIAMOND":
      return "D";
    case "MASTER":
      return "M";
    case "GRANDMASTER":
      return "GM";
    case "CHALLENGER":
      return "C";
    default:
      return "UR";
  }
}

export const getProfileBgColor = (id: number) => {
  const colors = [
    "#DFDEFF",
    "#FAF9FF",
    "#9F90F9",
    "#FAF9FF",
    "#191B1E",
    "#9F90F9",
    "#FAF9FF",
    "#DFDEFF",
  ];
  return colors[(id - 1) % colors.length];
};

export function getCustomProfileImg(profile: number) {
  switch (profile) {
    case 1:
      return "/assets/images/profile/profile1.svg";
    case 2:
      return "/assets/images/profile/profile2.svg";
    case 3:
      return "/assets/images/profile/profile3.svg";
    case 4:
      return "/assets/images/profile/profile4.svg";
    case 5:
      return "/assets/images/profile/profile5.svg";
    case 6:
      return "/assets/images/profile/profile6.svg";
    case 7:
      return "/assets/images/profile/profile7.svg";
    case 8:
      return "/assets/images/profile/profile8.svg";
    default:
      return "/assets/images/profile/profile1.svg";
  }
}

export function getPositionImg(position: MainPEnum) {
  switch (position) {
    case MainPEnum.ANY:
      return "/assets/images/position/position_all.svg";
    case MainPEnum.TOP:
      return "/assets/images/position/position_top.svg";
    case MainPEnum.JUNGLE:
      return "/assets/images/position/position_jungle.svg";
    case MainPEnum.MID:
      return "/assets/images/position/position_mid.svg";
    case MainPEnum.ADC:
      return "/assets/images/position/position_one_deal.svg";
    case MainPEnum.SUP:
      return "/assets/images/position/position_supporter.svg";
    default:
      return "/assets/images/position/position_all.svg";
  }
}
