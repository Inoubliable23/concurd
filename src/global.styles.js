import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		color: #fff;
		font-family: 'Roboto', 'sans-serif';
	}

	body {
		background-color: #11111B;
		padding: 20px;
	}

	a {
		text-decoration: none;
	}

	.youtube-container {
		height: 100%;
		min-width: 500px;
	}
`