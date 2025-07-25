import { useState } from "react";
import styled from "styled-components";

import { useMediaQueryContext } from "@/hooks/useMediaQueryContext";
import { theme } from "@/styles/theme";
import { formatTextOverNumber } from "@/utils";

interface UserAccountProps {
  account: string;
  memberId?: number;
  tag: string;
}

const UserAccount: React.FC<UserAccountProps> = (props) => {
  const { account, tag } = props;
  const { isMobile } = useMediaQueryContext();
  // const [isAccountTouch, setIsAccountTouch] = useState(false);
  const [isTagTouch, setIsTagTouch] = useState(false);

  return (
    <Wrapper>
      <Row>
        <Account>
          {isMobile && account.length >= 14 ? (
            <Text
              onMouseDown={() => {
                // setIsAccountTouch((prev) => !prev);
                setIsTagTouch(false);
              }}
            >
              {account}
            </Text>
          ) : (
            account
          )}
        </Account>
      </Row>
      {tag && (
        <Tag>
          {isMobile && tag.length >= 20 ? (
            <Text
              onMouseDown={() => {
                setIsTagTouch((prev) => !prev);
                // setIsAccountTouch(false);
              }}
            >
              {`#${formatTextOverNumber(tag, 20)}`}
              {isTagTouch && <TextModal>{tag}</TextModal>}
            </Text>
          ) : (
            <>{`#${tag}`}</>
          )}
        </Tag>
      )}
    </Wrapper>
  );
};

export default UserAccount;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const Account = styled.button`
  ${(props) => props.theme.fonts.bold20};
  color: ${theme.colors.gray700};

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.theme.fonts.bold16};
  }
`;

const Text = styled.p`
  position: relative;
  width: 100%;
  max-width: 160px;
  text-align: left;
  word-break: break-word; // 긴 단어도 줄바꿈
  white-space: normal;
`;

const TextModal = styled.div`
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.semiBold14};
  position: absolute;
  z-index: ${theme.zIndex.base};
  top: 100%;
  left: 0;
  border-radius: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  /* Background Blur */
  box-shadow: 0 4px 8.9px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(7.5px);

  &::after {
    /* tail css */
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-top: 0 solid transparent;
    border-left: 4.5px solid transparent;
    border-right: 4.5px solid transparent;
    border-bottom: 10px solid rgba(0, 0, 0, 0.64);
  }
`;

const Tag = styled.p`
  ${(props) => props.theme.fonts.semiBold14};
  color: ${theme.colors.gray500};

  @media (max-width: ${theme.breakpoints.mobile}) {
    ${(props) => props.theme.fonts.semiBold12};
  }
`;
