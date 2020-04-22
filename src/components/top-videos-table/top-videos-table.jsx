import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectAllVideos } from '../../redux/playlist/playlist.selectors';

const Table = styled.div`
	margin-top: 50px;
`

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 60px 60px 1fr 1fr 70px;
	grid-gap: 10px;
	padding-bottom: 15px;
	border-bottom: 1px solid #444;
`

const NumberColumnHeader = styled.div`
	justify-self: center;
`

const VideoColumnHeader = styled.div`
	grid-column: 2 / span 2;
`

const ChannelColumnHeader = styled.div``

const LikesColumnHeader = styled.div`
	justify-self: center;
`

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 60px 60px 1fr 1fr 70px;
	grid-gap: 10px;
	align-items: center;
	padding: 12px 0;
	transition: background-color 0.3s ease-out;

	&:hover {
		background-color: #232435;
	}
`

const Number = styled.div`
	justify-self: center;
`

const Thumbnail = styled.img`
	width: 32px;
	height: 32px;
  border-radius: 50%;
`

const Title = styled.div``

const ChannelName = styled.div`
	font-size: 14px;
`

const Likes = styled.div`
	justify-self: center;
`


const TopVideosTable = ({ videos }) => {
	return (
		<Table>
			<TableHeader>
				<NumberColumnHeader>#</NumberColumnHeader>
				<VideoColumnHeader>Video</VideoColumnHeader>
				<ChannelColumnHeader>Channel</ChannelColumnHeader>
				<LikesColumnHeader>Likes</LikesColumnHeader>
			</TableHeader>
			{
				videos.map((video, index) => (
					<TableRow key={video.id}>
						<Number>{index + 1}</Number>
						<Thumbnail src={video.thumbnailUrl} />
						<Title>{video.title}</Title>
						<ChannelName>{video.channelName}</ChannelName>
						<Likes>{4}</Likes>
					</TableRow>
				))
			}
		</Table>
	);
}

const mapStateToProps = state => ({
	videos: selectAllVideos(state)
});

export default connect(mapStateToProps)(TopVideosTable);