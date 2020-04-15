import React from 'react';

import YoutubeVideo from '../../components/youtube-video/youtube-video.component';
import Playlist from '../../components/playlist/playlist.component';
import { VideoWithPlaylist, WatchPageContainer } from './watch.styles';

const WatchPage = () => {
	return (
		<WatchPageContainer>
			<VideoWithPlaylist>
				<YoutubeVideo />
				<Playlist />
			</VideoWithPlaylist>
		</WatchPageContainer>
	);
}

export default WatchPage;