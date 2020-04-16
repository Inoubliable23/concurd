import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeVideo } from '../../redux/playlist/playlist.actions';

const Container = styled.div`
	display: flex;
	padding: 10px;

	&:hover {
		background-color: rgba(80, 80, 80, 0.3);
	}
`

const Thumbnail = styled.img`
	width: 130px;
`

const InfoContainer = styled.div`
	padding: 10px 20px;
	flex: 1;
`

const Title = styled.div`
	font-size: 16px;
	margin-bottom: 8px;
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

const PlaylistVideoPreview = ({ playlistId, id, imgUrl, title, addedBy, removeVideo }) => {

	const handleRemoveClick = () => {
		removeVideo(playlistId, id);
	}

	return (
		<Container>
			<Thumbnail src={imgUrl} />
			<InfoContainer>
				<Title>{title}</Title>
				<AddedBy>added by <AddedByName>{addedBy}</AddedByName></AddedBy>
			</InfoContainer>
			<RemoveIcon onClick={handleRemoveClick}>&#10006;</RemoveIcon>
		</Container>
	);
}

const mapDispatchToProps = {
	removeVideo: removeVideo
};

export default connect(null, mapDispatchToProps)(PlaylistVideoPreview);