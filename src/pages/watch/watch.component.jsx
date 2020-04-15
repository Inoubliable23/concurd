import React from 'react';
import styled from 'styled-components';
import YoutubeVideo from '../../components/youtube-video/youtube-video.component';
import Playlist from '../../components/playlist/playlist.component';

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

const WatchPage = () => {

	const videoId = '2g811Eo7K8U';

	return (
		<Container>
			<VideoWithPlaylist>
				<YoutubeVideo videoId={videoId} />
				<Playlist />
			</VideoWithPlaylist>
		</Container>
	);
}

export default WatchPage;