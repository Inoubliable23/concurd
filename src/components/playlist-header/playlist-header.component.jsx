import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	padding: 12px 15px;
	background-color: rgba(0, 0, 0, 0.3);
`

const PlaylistName = styled.div`
	font-size: 16px;
	margin-bottom: 5px;
`

const PlaylistSubtitle = styled.div`
	font-size: 12px;
	color: #aaa;
`

const PlaylistHeader = ({ playlist }) => (
	<Container>
		<PlaylistName>{playlist.name}</PlaylistName>
		<PlaylistSubtitle>created by {playlist.author}</PlaylistSubtitle>
	</Container>
);

export default PlaylistHeader;