import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";

import { theme } from "@/styles/theme";

interface WinningRateProps {
  completed: number;
}

const getProgressColor = (completed: number) => {
  if (completed < 50) return theme.colors.gray700;
  if (completed < 70) return theme.colors.violet600;
  return theme.colors.redViolet;
};

const WinningRate = (props: WinningRateProps) => {
  const { completed } = props;
  const progressColor = getProgressColor(completed);

  return (
    <>
      <FirstRow>
        <Left>
          <WinningTitle>승률</WinningTitle>
          <Percent $color={progressColor}>
            {!completed ? 0 : completed}%
          </Percent>
        </Left>
        <Right>현 시즌 성적 통계</Right>
      </FirstRow>
      <SecondRow $completed={completed} $color={progressColor}>
        <ProgressBar
          completed={completed}
          maxCompleted={100}
          height="12px"
          className="wrapper"
          barContainerClassName="container"
          completedClassName="barCompleted"
          labelClassName="label"
        />
      </SecondRow>
    </>
  );
};

export default WinningRate;

const FirstRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const SecondRow = styled.div<{ $completed: number; $color: string }>`
  .wrapper {
    height: 12px;
  }
  .container {
    height: 12px;
    background: ${theme.colors.gray300};
    border-radius: 11px;
  }
  .barCompleted {
    height: 12px;
    background: ${({ $color }) => $color};
    border-radius: 11px;
    width: ${({ $completed }) => $completed || 0}%;
  }
  .label {
    color: transparent;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  ${(props) => props.theme.fonts.medium11};
  color: ${theme.colors.gray500};
`;

const WinningTitle = styled.p`
  ${(props) => props.theme.fonts.semiBold14};
  color: ${theme.colors.gray800};

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.theme.fonts.medium11};
  }
`;

const Percent = styled.p<{ $color: string }>`
  ${(props) => props.theme.fonts.bold16};
  color: ${({ $color }) => $color};

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.theme.fonts.bold12};
  }
`;
