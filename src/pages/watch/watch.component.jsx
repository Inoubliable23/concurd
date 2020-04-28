import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectCurrentPlaylist } from '../../redux/playlist/playlist.selectors';
import { setCurrentPlaylist, addVideoToCurrentPlaylist } from '../../redux/playlist/playlist.actions';

import YoutubeVideo from '../../components/youtube-video/youtube-video.component';
import Playlist from '../../components/playlist/playlist.component';
import VideosSearch from '../../components/videos-search/videos-search.component';
import { connectToSocket } from '../../redux/socket/socket.actions';

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
	display: flex;
	flex-direction: column;
	width: 50%;
`

const WatchPage = ({ match, playlist, setCurrentPlaylist, connectToSocket, addVideoToCurrentPlaylist }) => {

	const playlistId = match.params.playlistId;
	
	useEffect(() => {
		setCurrentPlaylist({
			playlistId: playlistId
		});
	}, [setCurrentPlaylist, playlistId]);
	
	useEffect(() => {
		connectToSocket({
			playlistId
		});
	}, [connectToSocket, playlistId]);

	const handleVideoSelect = video => {
		addVideoToCurrentPlaylist({
			video
		});
	}

	return (
		<Container>
			{
				playlist &&
				<VideoWithPlaylist>
					<YoutubeVideo videoId={playlist.videos.orderedIds[0]} />
					<PlaylistWithSearch>
						<Playlist playlist={playlist} />
						<VideosSearch onVideoSelect={handleVideoSelect} />
					</PlaylistWithSearch>
				</VideoWithPlaylist>
			}
		</Container>
	);
}

const mapStateToProps = (state) => ({
	playlist: selectCurrentPlaylist(state)
});

const mapDispatchToProps = {
	setCurrentPlaylist,
	connectToSocket,
	addVideoToCurrentPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchPage);