import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as PlayArrow } from '../../assets/icons/play-arrow.svg';

const PlayButton = styled.div`
	position: absolute;
	background-color: #F5A623;
	border-radius: 50%;
	width: 46px;
	height: 46px;
	padding: 10px;
	top: -18px;
	right: 16px;
	opacity: 0;
	transition: all 0.5s ease-out;
`

const Container = styled(Link)`
	display: flex;
	flex-direction: column;
	width: 225px;
	height: 300px;
	border-radius: 5px;
	margin: 10px 40px 10px 0;
	overflow: hidden;
	background-color: #1B1B36;
	cursor: pointer;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14);
	transition: all 0.5s ease-out;

	&:hover {
		box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.2), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 12px 17px rgba(0, 0, 0, 0.14);
		background-color: #242440;

		${PlayButton} {
			opacity: 1;
			top: -23px;
		}	
	}
`

const Image = styled.img`
	object-fit: cover;
	height: 65%;
`

const InfoContainer = styled.div`
	position: relative;
	flex: 1;
	padding: 22px;
`

const Name = styled.div`
	font-size: 16px;
`

const CreatedBy = styled.div`
	font-size: 12px;
	color: #9A9AAB;
	margin-top: 4px;
`

const VideosCount = styled.div`
	font-size: 14px;
	color: #9A9AAB;
	margin-top: 10px;
`

const PlaylistCard = ({ id, name, author, imageUrl, videos }) => {

	const videosCount = videos.orderedIds.length;
	const videosCountText = videosCount === 1 ?
		 `${videosCount} video` :
		 `${videosCount} videos`;

	return (
		<Container to={`playlist/${id}`}>
			<Image src={imageUrl} />
			<InfoContainer>
				<Name>{name}</Name>
				<CreatedBy>created by {author}</CreatedBy>
				<VideosCount>{videosCountText}</VideosCount>
				<PlayButton>
					<PlayArrow />
				</PlayButton>
			</InfoContainer>
		</Container>
	);
}

export default PlaylistCard;