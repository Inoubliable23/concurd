import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import YoutubeVideo from '../../components/youtube-video/youtube-video.component';
import Playlist from '../../components/playlist/playlist.component';
import { selectPlaylist } from '../../redux/playlist/playlist.selectors';
import VideosSearch from '../../components/videos-search/videos-search.component';

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

const PlaylistWithSearch = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const WatchPage = ({ playlist }) => {
	return (
		<Container>
			<VideoWithPlaylist>
				<YoutubeVideo videoId={playlist.videos[0].id} />
				<PlaylistWithSearch>
					<VideosSearch />
					<Playlist playlist={playlist} />
				</PlaylistWithSearch>
			</VideoWithPlaylist>
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	playlist: selectPlaylist(state, props.playlistId)
});

export default connect(mapStateToProps)(WatchPage);