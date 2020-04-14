import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		font-family: 'sans-serif';
		background-color: #11111B;
		padding: 20px;
	}

	a {
		text-decoration: none;
		color: #000;
	}
`