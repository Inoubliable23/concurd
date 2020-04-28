import React from 'react';
import styled from 'styled-components';
import PlaylistCreateMain from '../../components/playlist-create-main/playlist-create-main.component';
import PlaylistCreateVideos from '../../components/playlist-create-videos/playlist-create-videos.component';

const Container = styled.div`
	flex: 1;
	padding: 20px;
`

const PlaylistCreate = () => {
	return (
		<Container>
			<PlaylistCreateMain />
			<PlaylistCreateVideos />
		</Container>
	);
}

export default PlaylistCreate;