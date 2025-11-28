import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AuthAxios } from "../api";
import { postLogin } from "../api/login";
import Button from "../components/common/Button";
import LoginCheckbox from "../components/login/LoginCheckbox";
import LoginInput from "../components/login/LoginInput";
import { STORAGE_KEY } from "../constants/storage";
import { theme } from "../styles/theme";

// import { emailRegEx } from "../utils/regEx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");

  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    if (memberId.length !== 0) {
      // validateEmail(email);
    }
  }, [memberId]);

  /* 로그인 */
  const handleLogin = async () => {
    try {
      const response = await postLogin({ memberId });
      const rawToken = response;
      const accessToken =
        typeof rawToken === "string"
          ? rawToken.replace(/^Bearer\s+/i, "")
          : String(rawToken);

      /* 자동 로그인 체크 여부에 따라 토큰 저장 위치 결정 */
      const storage = autoLogin ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY.accessToken, accessToken.toString());
      /* 로그인 직후 즉시 Authorization 헤더 적용 */
      AuthAxios.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
      navigate("/");
    } catch (error: any) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <Container>
      <Box>
        <Header>
          <img
            src="/assets/icons/gamegoo_logo.svg"
            width={317}
            height={55}
            alt="logo"
          />
          <Title>어드민페이지 로그인</Title>
        </Header>
        <Content>
          <LoginBox>
            <InputBox>
              <LoginInput
                inputType="input"
                value={memberId}
                onChange={(value) => {
                  setMemberId(value);
                  // validateEmail(value);
                }}
                errorMsg="정보 불일치"
                placeholder="사용자 ID"
                // isvalid={emailValid}
              />
            </InputBox>
            <Button
              variant="primary"
              label="로그인"
              onClick={handleLogin}
              disabled={!memberId}
              height="58px"
              borderRadius="15px"
            />
          </LoginBox>
          <Check>
            <LoginCheckbox
              value="autoLogin"
              isChecked={autoLogin}
              onChange={(isChecked) => setAutoLogin(isChecked)}
              gap="0px"
            />
            자동 로그인
          </Check>
        </Content>
        <Line />
      </Box>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
`;

const Box = styled.div`
  max-width: 468px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  margin-bottom: 65px;
`;

const Title = styled.div`
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.light32};
`;

const Content = styled.div`
  width: 100%;
`;

const LoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 17px;
  position: relative;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Check = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${theme.colors.gray700};
  ${(props) => props.theme.fonts.regular14};
  gap: 10px;
  margin-top: 21px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.gray200};
  margin-top: 45px;
`;
