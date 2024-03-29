import { createGlobalStyle } from 'styled-components';

// creating new css variable use <-->
const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }

    * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        text-decoration: none;
    }

    body {
        background-color: #1F2937;
        margin: 0;
        padding: 0;
        text-decoration: none;
        color: var(--white);

        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--white);
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }
        p {
            font-size: 1rem;
            color: var(--white);
        }
    }
`;

export default GlobalStyle;
