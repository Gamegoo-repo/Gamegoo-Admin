import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postLogout } from "../../api/login";
import { theme } from "../../styles/theme";
import { clearTokens } from "../../utils/storage";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await postLogout();
      await clearTokens();
      navigate("/login");
    } catch {
      console.error("로그아웃 오류");
    }
  };
  return (
    <Layout>
      <Container>
        <button onClick={() => navigate("/")}>
          <img
            src="/assets/icons/gamegoo_logo.svg"
            width="92"
            height="16"
            alt="Gamegoo"
          />
        </button>
        <Button
          variant="secondary"
          label="로그아웃"
          width="72px"
          height="32px"
          fontSize="bold16"
          onClick={handleLogout}
        />
      </Container>
    </Layout>
  );
};

export default Header;

const Layout = styled.header`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.white};
  position: absolute;
  top: 0;
`;

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
