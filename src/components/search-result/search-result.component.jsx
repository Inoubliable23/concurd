import React from 'react';
import styled from 'styled-components';

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

const SearchResult = ({ video, onClick }) => {

	const handleClick = () => {
		onClick(video);
	}

	return (
		<Container onClick={handleClick}>
			<Thumbnail src={video.thumbnailUrl} />
			<InfoContainer>
				<Title><>{video.title}</></Title>
				<ChannelName>{video.channelName}</ChannelName>
			</InfoContainer>
		</Container>
	)
};

export default SearchResult;