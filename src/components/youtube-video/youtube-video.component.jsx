import React from 'react';
import YouTube from 'react-youtube';

const YoutubeVideo = () => {

	const videoId = '2g811Eo7K8U';
	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1,
		}
	}

	return (
		<div>
			<YouTube
				videoId={videoId}
				opts={opts}
			/>
		</div>
	);
}

export default YoutubeVideo;