import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { removeVideoFromCurrentPlaylist } from '../../redux/playlist/playlist.actions';

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

const PlaylistVideoPreview = ({ id, thumbnailUrl, title, addedBy, removeVideoFromCurrentPlaylist }) => {

	const [fadeOut, setFadeOut] = useState(false);

	const handleRemoveClick = () => {
		setFadeOut(true);
	}

	const handleTransitionEnd = () => {
		removeVideoFromCurrentPlaylist({
			videoId: id
		});
	}

	return (
		<Container fadeOut={fadeOut} onTransitionEnd={handleTransitionEnd}>
			<Thumbnail src={thumbnailUrl} />
			<InfoContainer>
				<Title>{title}</Title>
				<AddedBy>added by <AddedByName>{addedBy}</AddedByName></AddedBy>
			</InfoContainer>
			<RemoveIcon onClick={handleRemoveClick}>&#10006;</RemoveIcon>
		</Container>
	);
}

const mapDispatchToProps = {
	removeVideoFromCurrentPlaylist
};

export default connect(null, mapDispatchToProps)(PlaylistVideoPreview);