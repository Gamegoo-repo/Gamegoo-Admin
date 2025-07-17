import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/common/Header";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/report");
  }, []);

  return (
    <Layout>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Layout>
  );
};

export default MainLayout;

const Layout = styled.div<{ $background?: string }>`
  width: 100%;
  height: 100vh;
  background: ${({ $background }) =>
    $background ? $background : "transparent"};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.main`
  width: 100%;
  max-width: 1280px;
  height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 44px;
`;
