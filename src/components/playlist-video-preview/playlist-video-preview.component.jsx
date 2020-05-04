import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { ReactComponent as ThumbsUp } from '../../assets/icons/thumbs-up.svg';
import { ReactComponent as ThumbsUpFilled } from '../../assets/icons/thumbs-up-filled.svg';
import { removeVideoFromCurrentPlaylist, toggleLike } from '../../redux/playlist/playlist.actions';
import { selectLikesCount, selectIsVideoLikedByCurrentUser } from '../../redux/playlist/playlist.selectors';

const fadedOut = css`
	padding-top: 0;
	padding-bottom: 0;
	opacity: 0;
	max-height: 0;
`

const Container = styled.div`
	display: flex;
	padding: 5px 10px;
	opacity: 1;
	max-height: 200px;
	transition: opacity 200ms, max-height 200ms, padding-top 200ms, padding-bottom 200ms;

	${({ fadeOut }) => (fadeOut ? fadedOut : null)}

	&:hover {
		background-color: rgba(80, 80, 80, 0.3);
	}
`

const LikesContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 15px;
`

const ThumbsUpContainer = styled.div`
	width: 35px;
	height: 35px;
	padding: 3px;
	cursor: pointer;
`

const LikesCount = styled.div`
	margin-top: 1px;
`

const Thumbnail = styled.img`
	width: 100px;
`

const InfoContainer = styled.div`
	padding: 10px 20px;
	flex: 1;
	overflow: hidden;
`

const Title = styled.div`
	font-size: 16px;
	margin-bottom: 8px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100%;
`

const AddedBy = styled.div`
	font-size: 12px;
	font-style: italic;
	font-weight: 300;
`

const AddedByName = styled.span`
	font-weight: 600;
`

const RemoveIcon = styled.span`
	height: fit-content;
	padding: 3px 5px;
	cursor: pointer;
`

const PlaylistVideoPreview = ({ id, youtubeData, addedBy, likesCount, isLiked, removeVideoFromCurrentPlaylist, toggleLike }) => {

	const [fadeOut, setFadeOut] = useState(false);

	const handleRemoveClick = () => {
		setFadeOut(true);
	}

	const handleThumbsUpClick = () => {
		toggleLike({
			videoId: id,
			like: !isLiked
		});
	}

	const handleTransitionEnd = () => {
		removeVideoFromCurrentPlaylist({
			videoId: id
		});
	}

	const { thumbnailUrl, title } = youtubeData;
	return (
		<Container fadeOut={fadeOut} onTransitionEnd={handleTransitionEnd}>
			<LikesContainer>
				<ThumbsUpContainer onClick={handleThumbsUpClick}>
				{
					isLiked ?
					<ThumbsUpFilled />
					:
					<ThumbsUp />
				}
				</ThumbsUpContainer>
				<LikesCount>{likesCount}</LikesCount>
			</LikesContainer>
			<Thumbnail src={thumbnailUrl} />
			<InfoContainer>
				<Title>{title}</Title>
				<AddedBy>added by <AddedByName>{addedBy}</AddedByName></AddedBy>
			</InfoContainer>
			<RemoveIcon onClick={handleRemoveClick}>&#10006;</RemoveIcon>
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	likesCount: selectLikesCount(state, props.id),
	isLiked: selectIsVideoLikedByCurrentUser(state, props.id)
});

const mapDispatchToProps = {
	removeVideoFromCurrentPlaylist,
	toggleLike
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideoPreview);