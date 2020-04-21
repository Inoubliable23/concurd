import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		font-family: 'Roboto', 'sans-serif';
	}

	body {
		background-color: #1C1C27;
		color: #fff;
		padding: 20px;
	}

	a {
		text-decoration: none;
		color: #fff;
	}

	.youtube-container {
		height: 100%;

		/* hack to hide youtube added widgets (e.g. related videos) */
		& iframe {
			position: absolute;
			top: -100%;
			height: 300%;
		}
	}
`