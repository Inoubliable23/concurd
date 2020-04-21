import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { videoSetPlay, videoSetPause } from '../../redux/video/video.actions';

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
`

const VideoCover = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
`

const Empty = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #000;
	opacity: 0.7;
`

let player;

const opts = {
	height: '100%',
	width: '100%',
	playerVars: {
		enablejsapi: 1,
		autoplay: 1
	}
}

const YoutubeVideo = ({ videoId, videoSetPlay, videoSetPause, isPlaying }) => {

	useEffect(() => {
		player = null;
	}, []);

	useEffect(() => {
		if (player) {
			isPlaying ? player.playVideo() : player.pauseVideo();
		}
	}, [isPlaying]);

	const onReady = event => {
		player = event.target;
	}
	
	const togglePlay = () => {
		isPlaying ? pause() : play();
	}

	const play = () => {
		if (player) {
			player.playVideo();
			videoSetPlay();
		}
	}

	const pause = () => {
		if (player) {
			player.pauseVideo();
			videoSetPause();
		}
	}

	return (
		<Container>
			{
				videoId ?
				<>
					<YouTube
						videoId={videoId}
						opts={opts}
						containerClassName='youtube-container'
						onReady={onReady}
					/>
					<VideoCover onClick={togglePlay} />
				</>
				:
				<Empty>
					No videos to display
				</Empty>
			}
		</Container>
	);
}

const mapStateToProps = state => ({
	isPlaying: state.video.isPlaying
});

const mapDispatchToProps = {
	videoSetPlay,
	videoSetPause
};

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeVideo);