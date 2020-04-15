import React from 'react';
import YouTube from 'react-youtube';

const YoutubeVideo = () => {

	const videoId = '2g811Eo7K8U';
	const opts = {
		height: '100%',
		playerVars: {
			autoplay: 0,
		}
	}

	return (
		<YouTube
			videoId={videoId}
			opts={opts}
		/>
	);
}

export default YoutubeVideo;