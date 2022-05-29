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
        background: ${({ theme }) => theme.colors.body};
        color: ${({ theme }) => theme.colors.text};
        font-family: 'Open Sans', sans-serif;
        font-size: 12px;
        transition: color 0.3s linear, background-color 0.3s linear;
        margin: 0;
    }
    body * {
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
        color: ${({ theme }) => theme.colors.link};
        text-decoration: underline;
    }
    a:hover {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.hoverLink};
    }
    h1, h2, h3, h4, h5 {
        padding: .5em 0;
        margin: 0px;
        text-align: left;
        font-family:'Open Sans', sans-serif;
        font-weight: 700;
    }
    h1 {
        color: #3C7EC1;
        font-size: 28px;
        line-height: 32px;
        text-align: left;
        text-align: center;
        text-transform: uppercase;
        text-shadow: 0 1px ${({ theme }) => theme.colors.shadow};;
    }
    h2 {
        color: #555;
        font-size: 20px;
        line-height: 24px;
        text-transform: uppercase;
    }
    h3 {
        color: #3C7EC1;
        font-size: 17px;
        line-height: 20px;
        text-transform: uppercase;
    }
    h4 {
        color: #b90737;
        font-size: 14px;
        line-height: 17px;
        text-transform: uppercase;
    }
  `