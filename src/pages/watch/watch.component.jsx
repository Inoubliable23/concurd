import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import usePrevious from '../../hooks/usePrevious.hook';

import { selectCurrentPlaylist, selectCurrentVideoId } from '../../redux/playlist/playlist.selectors';
import { fetchPlaylist, setCurrentPlaylist, addVideoToCurrentPlaylist, setCurrentVideo } from '../../redux/playlist/playlist.actions';

import YoutubeVideo from '../../components/youtube-video/youtube-video.component';
import Playlist from '../../components/playlist/playlist.component';
import VideosSearch from '../../components/videos-search/videos-search.component';
import { connectToSocket } from '../../redux/socket/socket.actions';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
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

const WatchPage = ({ match, playlist, currentVideoId, fetchPlaylist, setCurrentPlaylist, setCurrentVideo, connectToSocket, addVideoToCurrentPlaylist }) => {

	const playlistId = match.params.playlistId;
	
	useEffect(() => {
		fetchPlaylist({
			playlistId: playlistId
		});
	}, [fetchPlaylist, playlistId]);
	
	useEffect(() => {
		setCurrentPlaylist({
			playlistId: playlistId
		});
	}, [setCurrentPlaylist, playlistId]);
	
	const prevPlaylist = usePrevious(playlist);
	useEffect(() => {
		// checking if playlist id has changed
		if (playlist && (!prevPlaylist || (prevPlaylist && playlist.id !== prevPlaylist.id))) {
			setCurrentVideo({
				videoId: playlist.videos.orderedIds[0]
			});
		}
	}, [setCurrentVideo, playlist, prevPlaylist]);
	
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

	const handleVideoEnd = () => {
		const orderedVideoIds = playlist.videos.orderedIds;
		const currentVideoIndex = orderedVideoIds.indexOf(currentVideoId);
		const nextVideoIndex = currentVideoIndex + 1;
		if (nextVideoIndex >= orderedVideoIds.length) {
			setCurrentVideo({
				videoId: null
			});
		};

		setCurrentVideo({
			videoId: orderedVideoIds[nextVideoIndex]
		});
	}

	return (
		<Container>
			{
				playlist &&
				<VideoWithPlaylist>
					<YoutubeVideo
						videoId={currentVideoId}
						onVideoEnd={handleVideoEnd}
					/>
					<PlaylistWithSearch>
						<Playlist
							playlist={playlist}
							currentVideoId={currentVideoId}
						/>
						<VideosSearch
							blacklist={playlist.videos.orderedIds}
							onVideoSelect={handleVideoSelect}
						/>
					</PlaylistWithSearch>
				</VideoWithPlaylist>
			}
		</Container>
	);
}

const mapStateToProps = (state) => ({
	playlist: selectCurrentPlaylist(state),
	currentVideoId: selectCurrentVideoId(state)
});

const mapDispatchToProps = {
	fetchPlaylist,
	setCurrentPlaylist,
	setCurrentVideo,
	connectToSocket,
	addVideoToCurrentPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchPage);