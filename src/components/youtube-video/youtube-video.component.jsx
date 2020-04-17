import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Empty = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #000;
	opacity: 0.7;
	flex: 1;
`

const YoutubeVideo = ({ videoId }) => {

	const opts = {
		height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 0,
		}
	}

	return (
		videoId ?
		<YouTube
			videoId={videoId}
			opts={opts}
			containerClassName='youtube-container'
		/>
		:
		<Empty>
			No videos to display
		</Empty>
	);
}

export default YoutubeVideo;