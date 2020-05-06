import React from 'react';
import styled from 'styled-components';

import PlaylistHeader from '../../components/playlist-header/playlist-header.component';
import PlaylistVideoPreview from '../playlist-video-preview/playlist-video-preview.component';
import { connect } from 'react-redux';
import { selectPlaylistVideosWithData } from '../../redux/playlist/playlist.selectors';

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

const Playlist = ({ playlist, videos, currentVideoId }) => {
	return (
		<Container>
			<PlaylistHeader name={playlist.name} author={playlist.author} />
			{
				videos.map(video => (
					<PlaylistVideoPreview
						key={video.id}
						{...video}
						isPlaying={video.id === currentVideoId}
					/>
				))
			}
		</Container>
	);
}

const mapStateToProps = state => ({
	videos: selectPlaylistVideosWithData(state)
});

export default connect(mapStateToProps)(Playlist);