import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`    
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      html {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background-color: ${theme.colors.gray100};
        overflow: hidden;
      }

      body {
        width: 100%;
        height: 100%;
        font-family: "Pretendard";
        background-color: ${theme.colors.gray100};
        overflow: hidden;
      }

      &::-webkit-scrollbar {
        width: 24px;
        height: 100px;
      }
      &::-webkit-scrollbar-thumb {
            border-radius: 26px;
        background: ${theme.colors.gray500};
        background-clip: padding-box;
        border: 8px solid transparent;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ol,
      ul,
      li {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      button {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        outline: none;
      }

      input,
      textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        border-radius: 4px;
        padding: 8px;
        border: none;
        resize: none;
        outline: none;
      }

      input:focus,
      textarea:focus {
        outline: none;
      }

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 12px;
      }
      
      th {
        padding: 7.5px 12px;
        text-align: left;
        word-wrap: break-word;
      }

      td {
        padding: 8.5px 12.5px;
        text-align: left;
        word-wrap: break-word;
      }

      th:first-child {
        border-top-left-radius: 6px;
      }

      th:last-child {
        border-top-right-radius: 6px;
      }

      td:first-child {
        border-bottom-left-radius: 6px;
      }

      td:last-child {
        border-bottom-right-radius: 6px;
      }

      @font-face {
        font-family: "Pretendard";
        src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
          format("woff");
      }
    `;

export default GlobalStyle;
