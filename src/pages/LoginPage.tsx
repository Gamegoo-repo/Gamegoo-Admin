import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postLogin } from "../api/login";
import Button from "../components/common/Button";
import LoginCheckbox from "../components/login/LoginCheckbox";
import LoginInput from "../components/login/LoginInput";
import { STORAGE_KEY } from "../constants/storage";
import { theme } from "../styles/theme";
import { emailRegEx } from "../utils/regEx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined);
  const [passwordValid, setPasswordValid] = useState<boolean | undefined>(
    undefined
  );
  const [autoLogin, setAutoLogin] = useState(false);

  const validateEmail = (email: string) => {
    setEmailValid(emailRegEx.test(email));
  };

  const validatePassword = (password: string) => {
    if (password.length === 0) {
      setPasswordValid(undefined);
    } else {
      setPasswordValid(true);
    }
  };

  useEffect(() => {
    if (email.length !== 0) {
      validateEmail(email);
    } else if (password.length !== 0) {
      validatePassword(password);
    }
  }, [email, password]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  /* 로그인 */
  const handleLogin = async () => {
    try {
      const response = await postLogin({ email, password });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      /* 자동 로그인 체크 여부에 따라 토큰 저장 위치 결정 */
      const storage = autoLogin ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY.accessToken, accessToken);
      storage.setItem(STORAGE_KEY.refreshToken, refreshToken);
      storage.setItem(STORAGE_KEY.name, response.data.name);
      storage.setItem(STORAGE_KEY.userId, response.data.id.toString());
      navigate("/");
    } catch (error: any) {
      const data = error.response.data;
      if (error.response) {
        if (data.code === "MEMBER_401") {
          // 이메일이 DB에 없을 경우
          setEmailValid(false);
          setPasswordValid(false);
        } else if (data.code === "MEMBER_404") {
          // 비밀번호가 틀렸을 경우
          setPasswordValid(false);
        } else {
          // 기타 에러 처리
          setEmailValid(false);
          setPasswordValid(false);
        }
      }
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
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  validateEmail(value);
                }}
                errorMsg="정보 불일치"
                placeholder="이메일 주소"
                isvalid={emailValid}
              />
              <LoginInput
                inputType="password"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  validatePassword(value);
                }}
                errorMsg="정보 불일치"
                placeholder="비밀번호"
                isvalid={passwordValid}
                height="58px"
                borderRadius="15px"
                onKeyDown={handleKeyDown}
              />
            </InputBox>
            <Button
              variant="primary"
              label="이메일로 시작하기"
              onClick={handleLogin}
              disabled={!email || !password || !emailValid || !passwordValid}
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
