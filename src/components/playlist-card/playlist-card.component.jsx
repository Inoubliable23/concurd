import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as PlayArrow } from '../../assets/icons/play-arrow.svg';
import { ReactComponent as PlaylistIcon } from '../../assets/icons/playlist.svg';

const HoverOverlay = styled.div`
	opacity: 0;
	background-color: #AAA;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: all 0.5s ease-out;
`

const PlayButton = styled.div`
	position: absolute;
	background-color: ${props => props.theme.secondary};
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
	position: relative;
	display: flex;
	flex-direction: column;
	width: 225px;
	height: 300px;
	border-radius: 5px;
	margin: 10px 40px 10px 0;
	overflow: hidden;
	background-color: ${props => props.theme.primaryLight};
	cursor: pointer;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14);
	transition: all 0.5s ease-out;

	&:hover {
		box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.2), 0px 5px 22px rgba(0, 0, 0, 0.12), 0px 12px 17px rgba(0, 0, 0, 0.14);

		${HoverOverlay} {
			opacity: 0.06;
		}

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

const ImagePlaceholder = styled.div`
	height: 65%;
	color: ${props => props.theme.subtext};
	padding-left: 20px;
	border-bottom: 1px solid ${props => props.theme.subtext};
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
	color: ${props => props.theme.subtext};
	margin-top: 4px;
`

const VideosCount = styled.div`
	font-size: 14px;
	color: ${props => props.theme.subtext};
	margin-top: 10px;
`

const PlaylistCard = ({ id, name, author, imageUrl, videos }) => {

	const videosCount = videos.orderedIds.length;
	const videosCountText = videosCount === 1 ?
		 `${videosCount} video` :
		 `${videosCount} videos`;

	return (
		<Container to={`playlist/${id}`}>
			{
				imageUrl ?
				<Image src={imageUrl} />
				:
				<ImagePlaceholder>
					<PlaylistIcon />
				</ImagePlaceholder>
			}
			<InfoContainer>
				<Name>{name}</Name>
				<CreatedBy>created by {author.name}</CreatedBy>
				<VideosCount>{videosCountText}</VideosCount>
				<PlayButton>
					<PlayArrow />
				</PlayButton>
			</InfoContainer>
			<HoverOverlay />
		</Container>
	);
}

export default PlaylistCard;