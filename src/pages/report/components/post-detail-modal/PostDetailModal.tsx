import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { GameModeEnum, MainPEnum } from "@/@generated/types";
import { AuthAxios } from "@/api";
import MannerLevel from "@/pages/report/components/post-detail-modal/MannerLevel";
import ProfileImage from "@/pages/report/components/post-detail-modal/ProfileImage";
import RankTier from "@/pages/report/components/post-detail-modal/RankTier";
import UserAccount from "@/pages/report/components/post-detail-modal/UserAccount";
import { theme } from "@/styles/theme";

import Champion from "./Champion";
import GameStyle from "./GameStyle";
import PositionBox from "./PositionBox";
import QueueType from "./QueueType";

interface PostDetailModalProps {
  isOpen: boolean;
  postId?: number;
  onClose: () => void;
}

const PostDetailModal = ({ isOpen, postId, onClose }: PostDetailModalProps) => {
  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () =>
      AuthAxios.get(`/api/v2/posts/member/list/82`).then(
        (res) => res.data.data
      ),
  });

  if (!isOpen || !data) return null;

  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  if (!modalRoot) {
    console.warn("modal-root element not found");
    return null;
  }

  return createPortal(
    <Overlay>
      <Wrapper>
        <Header>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Main>
          <MainContent>
            <ContentWrapper>
              <UserSection>
                <UserLeft>
                  <UserProfileWrapper>
                    <ProfileImage image={data.profileImage} />
                    <UserNManner>
                      <MannerLevelWrapper>
                        <MannerLevel
                          level={data.mannerLevel}
                          onClick={() => {}}
                          position="board"
                        />
                      </MannerLevelWrapper>
                    </UserNManner>
                  </UserProfileWrapper>
                  <UserAccount
                    account={data.gameName}
                    memberId={data.memberId}
                    tag={data.tag}
                  />
                </UserLeft>
              </UserSection>
              <UserTierWrapper>
                <RankTier
                  type="solo"
                  tier={data.soloTier || ""}
                  rank={data.soloRank}
                  direct="column"
                  color={theme.colors.gray800}
                  tierFontSize={theme.fonts.bold20}
                />
                <RankTier
                  type="free"
                  tier={data.freeTier || ""}
                  rank={data.freeRank}
                  direct="column"
                  color={theme.colors.gray800}
                  tierFontSize={theme.fonts.bold20}
                />
              </UserTierWrapper>
              {data.gameMode !== "ARAM" && (
                <PositionSection>
                  <Title>포지션</Title>
                  <PositionBox
                    status="reading"
                    main={data.mainP || null}
                    sub={data.subP || null}
                    want={
                      Array.isArray(data.wantP)
                        ? data.wantP.filter((v: MainPEnum) => v !== null)
                        : null
                    }
                  />
                </PositionSection>
              )}
              <ChampionNQueueSection>
                <QueueType value={data.gameMode} />
                <Champion
                  title={true}
                  font="semiBold14"
                  list={data?.championStatsResponseList}
                />
              </ChampionNQueueSection>
              <WinningRateSection
                $gameType={data.gameMode}
              ></WinningRateSection>
              <StyleSection $gameType={data.gameMode}>
                <Title>게임 스타일</Title>
                <GameStyle styles={data.gameStyles} />
              </StyleSection>
              <MemoSection $gameType={data.gameMode}>
                <Title>한마디</Title>
                <Memo>
                  <MemoData>{data.contents}</MemoData>
                </Memo>
              </MemoSection>
            </ContentWrapper>
          </MainContent>
        </Main>
      </Wrapper>
    </Overlay>,
    modalRoot
  );
};

export default PostDetailModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${theme.zIndex.popup};
  background: #0000009c;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  border-radius: 20px;
  max-width: 580px;
  width: 100%;
  min-height: 600px;
  max-height: 90vh;
  margin: 20px;
  padding: 48px 32px 32px 32px;
  background: ${theme.colors.gray100};
  box-shadow: 0 4px 96.4px 0 #00000040;
  position: relative;
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 20.5px 20px;
    border-radius: 8px;
    min-width: 336px;
    width: 90vw;
    margin: 20px;
    max-height: 90vh;
  }
`;

const Header = styled.header`
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 26px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 17px;
  right: 14px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${theme.colors.gray600};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: ${theme.colors.gray200};
  }
`;

const Main = styled.main``;

const MainContent = styled.div`
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 20px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`;

const UserLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

const UserProfileWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  z-index: ${theme.zIndex.popup};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 52px;
    height: 52px;
  }
`;

const UserNManner = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

const MannerLevelWrapper = styled.div`
  position: relative;
`;

const UserTierWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 28px;
`;

const Title = styled.p`
  ${(props) => props.theme.fonts.semiBold14};
  color: ${theme.colors.gray800};
  margin-bottom: 5px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.theme.fonts.medium11};
    margin-bottom: 4px;
  }
`;

const ChampionNQueueSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 8px;
`;

const PositionSection = styled.div``;

const WinningRateSection = styled.div<{ $gameType: GameModeEnum }>`
  margin-top: ${({ $gameType }) => ($gameType !== "ARAM" ? "0px" : "46px")};
`;

const StyleSection = styled.div<{ $gameType: GameModeEnum }>`
  margin-top: ${({ $gameType }) => ($gameType !== "ARAM" ? "0px" : "46px")};
`;

const MemoSection = styled.div<{ $gameType: GameModeEnum }>`
  margin-top: ${({ $gameType }) => ($gameType !== "ARAM" ? "0px" : "46px")};
`;

const Memo = styled.div`
  width: 100%;
  min-height: 100px;
  max-height: 220px;
  padding: 11px 20px;
  border-radius: 15px;
  border: 1px solid ${theme.colors.gray400};
  overflow-y: scroll;

  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: 6px;
    padding: 8px 10px;
  }
`;

const MemoData = styled.p`
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.regular18}

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.theme.fonts.regular12};
  }
`;
