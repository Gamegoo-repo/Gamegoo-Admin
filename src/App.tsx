import { ThemeProvider } from "styled-components";

import MediaQueryProvider from "./providers/MediaQueryContext";
import Router from "./routes";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MediaQueryProvider>
        <GlobalStyle />
        <Router />
      </MediaQueryProvider>
    </ThemeProvider>
  );
}

export default App;
