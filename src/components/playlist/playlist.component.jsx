import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { selectVideos } from '../../redux/playlist/playlist.selectors';
import PlaylistVideoPreview from '../playlist-video-preview/playlist-video-preview.component';

const Container = styled.div`
	flex: 1;
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

const Playlist = ({ playlistId, orderedVideosIds, videos }) => {
	return (
		<Container>
			{
				orderedVideosIds.map(videoId => <PlaylistVideoPreview key={videoId} playlistId={playlistId} {...videos[videoId]} />)
			}
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	videos: selectVideos(state, props.playlistId)
});

export default connect(mapStateToProps)(Playlist);