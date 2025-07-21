import React, { useEffect } from "react";
import styled, { css } from "styled-components";

import { MainPEnum } from "@/@generated/types";
import Icon from "@/components/common/Icon";
import { theme } from "@/styles/theme";

import { POSITION } from "../../constants/profile";

type PositionType = "main" | "sub" | "want";

interface PositionComponentProps {
  selectedBox?: PositionType | null;
  value?: MainPEnum | null;
  // onSelect: (selectedValues: Position | (Position | null)[]) => void;
  onSelect: (selectedValue: MainPEnum | null) => void;
  onClose: () => void;
  usedPositions?: MainPEnum[] | null;
}

const PositionCategory = (props: PositionComponentProps) => {
  const {
    selectedBox,
    value = [],
    onSelect,
    onClose,
    usedPositions = [],
  } = props;
  const boxRef = React.useRef<HTMLDivElement>(null);

  const handlePositionCategory = (positionName: MainPEnum | null) => {
    let updatedValue: MainPEnum | null;

    // 내가 찾는 포지션: 이미 선택한 포지션을 다시 클릭한 경우 → 해제
    if (selectedBox === "want" && value === positionName) {
      updatedValue = null;
    } else {
      updatedValue = positionName ?? MainPEnum.ANY;
    }

    onSelect(updatedValue);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const positionList = selectedBox === "want" ? POSITION.slice(1) : POSITION;

  return (
    <Wrapper $isWant={selectedBox === "want"}>
      <Header>
        <Title>
          {selectedBox === "main"
            ? "주"
            : selectedBox === "sub"
              ? "부"
              : "내가 찾는"}{" "}
          포지션 선택
        </Title>
        <CloseButton onClick={() => handleClose()}>
          <Icon
            backgroundUrl={"/assets/icons/close_white.svg"}
            width={16}
            height={16}
          />
        </CloseButton>
      </Header>

      <Box $isWant={selectedBox === "want"} ref={boxRef}>
        {positionList.map((pos: any) => {
          const isUsed = usedPositions?.includes(pos.key) && value !== pos.key;
          return (
            <StyledButton
              key={pos.id}
              $posKey={pos.key}
              onClick={() => handlePositionCategory(pos.key)}
              $selected={value === pos.key}
              disabled={isUsed}
              $isUsed={isUsed}
            >
              <img
                src={`/assets/images/position/${pos.image}_unclicked.svg`}
                width={48}
                height={48}
              />
            </StyledButton>
          );
        })}
      </Box>
    </Wrapper>
  );
};

export default PositionCategory;

const Wrapper = styled.div<{ $isWant: boolean }>`
  width: ${({ $isWant }) => ($isWant ? "383px" : "452px")};
  position: absolute;
  top: 80px;
  left: calc(50% - 35px);
  z-index: ${theme.zIndex.baseFloating};
  border-radius: 20px;
  padding: 32px;
  background: rgba(0, 0, 0, 0.64);

  /* Background Blur */
  box-shadow: 0 4px 8.9px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(7.5px);

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 224px;
    padding: 20px;
    border-radius: 10px;
    top: 50px;
    ${({ $isWant }) =>
      $isWant &&
      css`
        left: calc(50% - 158px);
      `};
  }
`;

const Header = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  ${theme.fonts.bold20}
  color: ${theme.colors.white};

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${theme.fonts.bold16}
  }
`;

const CloseButton = styled.button``;

const Box = styled.div<{ $isWant: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 20px;
  width: ${({ $isWant }) => ($isWant ? "410px" : "482px")};

  &:after {
    border-top: 0 solid transparent;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 18px solid rgba(0, 0, 0, 0.64);
    content: "";
    position: absolute;
    top: -18px;
    left: 27px;

    @media (max-width: ${theme.breakpoints.mobile}) {
      ${({ $isWant }) =>
        $isWant &&
        css`
          left: 150px;
        `};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 184px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    column-gap: 20px;
  }
`;

const StyledButton = styled.button<{
  $posKey: MainPEnum;
  $selected: boolean;
  $isUsed?: boolean;
}>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$selected ? theme.colors.violet600 : "transparent"};
  border-radius: 6px;
  padding-top: 2px;
  padding-left: 1px;
  opacity: ${(props) => (props.$isUsed ? 0.4 : 1)};
  cursor: pointer;
`;
