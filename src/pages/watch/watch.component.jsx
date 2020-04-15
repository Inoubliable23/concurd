import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import YoutubeVideo from '../../components/youtube-video/youtube-video.component';
import Playlist from '../../components/playlist/playlist.component';
import { selectOrderedVideosIds } from '../../redux/playlist/playlist.selectors';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const VideoWithPlaylist = styled.div`
	display: flex;
	height: 370px;
	width: 100%;
	max-width: 1100px;
	border: 1px solid #fff;
`

const WatchPage = ({ playlistId, orderedVideosIds }) => {
	return (
		<Container>
			<VideoWithPlaylist>
				<YoutubeVideo videoId={orderedVideosIds[0]} />
				<Playlist playlistId={playlistId} orderedVideosIds={orderedVideosIds} />
			</VideoWithPlaylist>
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	orderedVideosIds: selectOrderedVideosIds(state, props.playlistId)
});

export default connect(mapStateToProps)(WatchPage);