import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		font-family: 'Roboto', 'sans-serif';
	}

	body {
		background-color: #11142E;
		color: #fff;
	}

	a {
		text-decoration: none;
		color: #fff;
		display: block;
	}

	input {
		border-style: none;
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