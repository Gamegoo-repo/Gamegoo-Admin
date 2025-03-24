import styled from "styled-components";
import { theme } from "../../styles/theme";

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <Container>{title}</Container>;
};

export default Title;

const Container = styled.div`
  width: 100%;
  padding: 32px 0 20px 0;
  ${theme.fonts.bold24};
  text-align: left;
`;
