import { createGlobalStyle } from "styled-components"
import OpenSansItalic from "../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf"
import OpenSansRegular from "../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf"

export const FontStyles = createGlobalStyle`
    @font-face {
        font-family: 'Open Sans';
        src: url(${OpenSansRegular}) format('ttf');
    }
    @font-face {
        font-family: 'Open Sans';
        font-style: italic;
        src: url(${OpenSansItalic}) format('ttf');
    }
`;

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        transition: color 0.3s linear, background-color 0.3s linear;
    }
    img {
        border: none;
        max-width: 100%;
        height: auto;
    }
    p {
        padding: 4px 0px;
        margin: 0px 0px;
        line-height: 1.6;
    }
    a {
        color: #357BC2;
        text-decoration: underline;
    }
    a:hover {
        text-decoration: none;
        color: #333;
    }
    h1, h2, h3, h4, h5 {
        padding: 0px;
        margin: 0px;
        text-align: left;
        font-family:'Open Sans', sans-serif;
        margin: 0px;
        padding: 0px;
        font-weight: 700;
    }
    h1 {
        color: #3C7EC1;
        font-size: 28px;
        line-height: 32px;
        text-align: left;
        padding: 22px 0px;
        text-align: center;
        text-transform: uppercase;
        text-shadow: 0 1px white;
    }
    h2 {
        color: #555;
        font-size: 20px;
        line-height: 24px;
        padding: 10px 0px;
        text-transform: uppercase;
    }
    h3 {
        color: #3C7EC1;
        font-size: 17px;
        line-height: 20px;
        padding: 8px 0px;
        text-transform: uppercase;
    }
    h4 {
        color: #b90737;
        font-size: 14px;
        line-height: 17px;
        padding: 8px 0px;
        text-transform: uppercase;
    }
  `