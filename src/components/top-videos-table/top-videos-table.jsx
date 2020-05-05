import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectTopVideos } from '../../redux/video/video.selector';
import { fetchTopVideos } from '../../redux/video/video.actions';

const Table = styled.div`
	margin-top: 50px;
`

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 60px 60px 1fr 1fr 70px;
	grid-gap: 20px;
	padding-bottom: 15px;
	border-bottom: 1px solid #446;
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
	grid-gap: 20px;
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

const Title = styled.a`
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`

const ChannelName = styled.div`
	font-size: 14px;
	color: #9A9AAB;
`

const Likes = styled.div`
	justify-self: center;
	font-size: 14px;
	color: #9A9AAB;
`

const TopVideosTable = ({ fetchTopVideos, videos }) => {

	useEffect(() => {
		fetchTopVideos();
	}, [fetchTopVideos]);

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
						<Thumbnail src={video.youtubeData.thumbnailUrl} />
						<Title
							href={`https://www.youtube.com/watch?v=${video.id}`}
							target='_blank'
						>
							{video.youtubeData.title}
						</Title>
						<ChannelName>{video.youtubeData.channelName}</ChannelName>
						<Likes>{video.likesCount}</Likes>
					</TableRow>
				))
			}
		</Table>
	);
}

const mapStateToProps = state => ({
	videos: selectTopVideos(state)
});

const mapDispatchToProps = {
	fetchTopVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(TopVideosTable);