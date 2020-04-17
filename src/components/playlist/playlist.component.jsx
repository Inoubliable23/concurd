import React from 'react';
import styled from 'styled-components';

import PlaylistVideoPreview from '../playlist-video-preview/playlist-video-preview.component';

const Container = styled.div`
	flex: 1;
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

const Playlist = ({ playlist }) => {
	return (
		<Container>
			{
				playlist.videos.map(video => (
					<PlaylistVideoPreview
						key={video.id}
						{...video}
					/>
				))
			}
		</Container>
	);
}

export default Playlist;