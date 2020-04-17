import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeVideoFromCurrentPlaylist } from '../../redux/playlist/playlist.actions';

const Container = styled.div`
	display: flex;
	padding: 5px 10px;

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

	const handleRemoveClick = () => {
		removeVideoFromCurrentPlaylist({
			videoId: id
		});
	}

	return (
		<Container>
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