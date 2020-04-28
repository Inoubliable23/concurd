import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ReactComponent as RemoveIconFilled } from '../../assets/icons/delete.svg';
import VideosSearch from '../videos-search/videos-search.component';
import { playlistDraftAddVideo } from '../../redux/playlist/playlist.actions';
import { selectPlaylistDraftVideos } from '../../redux/playlist/playlist.selectors';

const Table = styled.div`
	margin-top: 50px;
`

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr 1fr 100px 70px;
	grid-gap: 20px;
	padding: 15px 20px;
	border-bottom: 1px solid #446;
`

const VideoColumnHeader = styled.div`
	grid-column: 1 / span 2;
`

const ChannelColumnHeader = styled.div``

const DateColumnHeader = styled.div``

const RemoveColumnHeader = styled.div`
	justify-self: center;
`

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr 1fr 100px 70px;
	grid-gap: 20px;
	align-items: center;
	padding: 12px 20px;
`

const Thumbnail = styled.img`
	width: 32px;
	height: 32px;
  border-radius: 50%;
`

const Title = styled.div``

const ChannelName = styled.div`
	font-size: 14px;
	color: #9A9AAB;
`

const Date = styled.div`
	color: #9A9AAB;
`

const IconContainer = styled.div`
	width: 22px;
	height: 22px;
`

const Remove = styled.div`
	justify-self: center;
	color: #9A9AAB;
	cursor: pointer;
`

const PlaylistCreateVideos = ({ videos, playlistDraftAddVideo }) => {

	const handleVideoSelect = video => {
		playlistDraftAddVideo({
			video
		});
	}

	return (
		<Table>
			<TableHeader>
				<VideoColumnHeader>Video</VideoColumnHeader>
				<ChannelColumnHeader>Channel</ChannelColumnHeader>
				<DateColumnHeader>Date</DateColumnHeader>
				<RemoveColumnHeader>Remove</RemoveColumnHeader>
			</TableHeader>
			{
				videos.map(video => (
					<TableRow key={video.id}>
						<Thumbnail src={video.thumbnailUrl} />
						<Title>{video.title}</Title>
						<ChannelName>{video.channelName}</ChannelName>
						<Date>5.4.2020</Date>
						<Remove>
							<IconContainer>
								<RemoveIconFilled />
							</IconContainer>
						</Remove>
					</TableRow>
				))
			}
			<VideosSearch onVideoSelect={handleVideoSelect} />
		</Table>
	);
}

const mapStateToProps = state => ({
	videos: selectPlaylistDraftVideos(state)
});

const mapDispatchToProps = {
	playlistDraftAddVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCreateVideos);