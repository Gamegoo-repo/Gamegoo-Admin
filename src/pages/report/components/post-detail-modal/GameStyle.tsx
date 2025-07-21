import styled from "styled-components";

import { theme } from "@/styles/theme";

import { GAME_STYLE } from "../../constants/profile";

import type { GameStyleResponse } from "@/@generated/types";

interface GameStyleProps {
  styles: number[] | GameStyleResponse[];
}

const GameStyle = (props: GameStyleProps) => {
  const { styles } = props;

  const getTextById = (styleId?: number) => {
    const gameStyle = GAME_STYLE.find((style) => style.gameStyleId === styleId);
    return gameStyle ? gameStyle.gameStyleName : "";
  };

  if (!styles || styles.length === 0) return null;

  return (
    <Div>
      {styles.map((data, index) => {
        const styleId = typeof data === "number" ? data : data.gameStyleId;
        return <Content key={index}>{getTextById(styleId)}</Content>;
      })}
    </Div>
  );
};

export default GameStyle;

const Div = styled.div`
  display: grid;
  grid-gap: 11px;
  grid-template-columns: repeat(3, minmax(100px, auto));
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Content = styled.p`
  padding: 6px 21px;
  background: ${theme.colors.white};
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.medium14};
  border-radius: 46px;
  white-space: nowrap;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 12px;
    ${(props) => props.theme.fonts.bold12};
  }
`;
