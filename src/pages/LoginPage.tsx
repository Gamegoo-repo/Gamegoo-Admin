import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


import Button from "../components/common/Button";
import LoginCheckbox from "../components/login/LoginCheckbox";
import LoginInput from "../components/login/LoginInput";

import { theme } from "../styles/theme";

import { login } from "@/api/auth/auth.service";

// import { emailRegEx } from "../utils/regEx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");

  const [autoLogin, setAutoLogin] = useState(false);

  const AdminPassword = import.meta.env.VITE_PUBLIC_ADMIN_PASSWORD as string



  useEffect(() => {
    if (memberId.length !== 0) {
      // validateEmail(email);
    }
  }, [memberId]);

  /* 로그인 */
  const handleLogin = async () => {
  try {
    await login(
      { account: memberId, password: AdminPassword },
      autoLogin
    );

    navigate("/");
  } catch (error) {
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
