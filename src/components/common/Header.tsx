import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();

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
