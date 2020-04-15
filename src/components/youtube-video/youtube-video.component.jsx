import React from 'react';
import YouTube from 'react-youtube';

const YoutubeVideo = ({ videoId }) => {

	const opts = {
		height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 0,
		}
	}

	return (
		<YouTube
			videoId={videoId}
			opts={opts}
			containerClassName='youtube-container'
		/>
	);
}

export default YoutubeVideo;