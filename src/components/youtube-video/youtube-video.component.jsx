import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { videoSetPlay, videoSetPause } from '../../redux/video/video.actions';
import { ReactComponent as PlayArrow } from '../../assets/icons/play-arrow.svg';

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
	display: flex;
	justify-content: center;
	align-items: center;
`

const PlayButton = styled.div`
	background-color: rgba(30, 30, 30, 0.8);
	border-radius: 50%;
	width: 60px;
	height: 60px;
	padding: 10px;
	opacity: 1;
	z-index: 1;
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

const opts = {
	height: '100%',
	width: '100%',
	playerVars: {
		enablejsapi: 1,
		autoplay: 0
	}
}

let player;

const YoutubeVideo = ({ videoId, onVideoEnd, videoSetPlay, videoSetPause, isPlaying }) => {

	useEffect(() => {
		player = null;
		videoSetPlay();

		return () => {
			videoSetPause();
		}
	}, [videoSetPlay, videoSetPause]);

	useEffect(() => {
		if (player) {
			isPlaying ? player.playVideo() : player.pauseVideo();
		}
	}, [isPlaying]);

	const handleVideoReady = event => {
		player = event.target;
	}

	const handleVideoEnd = event => {
		onVideoEnd();
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
						onReady={handleVideoReady}
						onEnd={handleVideoEnd}
					/>
					<VideoCover onClick={togglePlay}>
						{
							!isPlaying &&
							<PlayButton>
								<PlayArrow />
							</PlayButton>
						}
					</VideoCover>
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