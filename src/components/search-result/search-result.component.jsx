import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addVideoToCurrentPlaylist } from '../../redux/playlist/playlist.actions';
import { clearSearchResults } from '../../redux/search/search.actions';

const Container = styled.div`
	display: flex;
	padding: 8px 10px;
	cursor: pointer;

	&:hover {
		background-color: #eee;
	}
`

const Thumbnail = styled.img`
	width: 80px;
	height: 60px;
`

const InfoContainer = styled.div`
	height: 60px;
	padding: 10px 20px;
	flex: 1;
	overflow: hidden;
`

const Title = styled.div`
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 5px;
`

const ChannelName = styled.div`
	font-size: 12px;
	color: #888;
`

const SearchResult = ({ video, addVideoToCurrentPlaylist, clearSearchResults }) => {

	const handleResultClick = () => {
		addVideoToCurrentPlaylist({
			video
		});
		clearSearchResults();
	}
	
	return (
		<Container onClick={handleResultClick}>
			<Thumbnail src={video.thumbnailUrl} />
			<InfoContainer>
				<Title><>{video.title}</></Title>
				<ChannelName>{video.channelName}</ChannelName>
			</InfoContainer>
		</Container>
	)
};

const mapDispatchToProps = {
	addVideoToCurrentPlaylist,
	clearSearchResults
};

export default connect(null, mapDispatchToProps)(SearchResult);