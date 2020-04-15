import styled from 'styled-components';

export const PlaylistContainer = styled.div`
  width: 100%;
	padding: 10px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 8px;
	}
		
	&::-webkit-scrollbar-thumb {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		background-color: #505050;
	}
`