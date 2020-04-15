import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	padding: 10px;

	&:hover {
		background-color: rgba(80, 80, 80, 0.3);
	}
`

const PreviewImg = styled.img`
	width: 150px;
`

const PreviewInfoContainer = styled.div`
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

const PlaylistVideoPreview = ({ imgUrl, title, addedBy }) => {
	return (
		<Container>
			<PreviewImg src={imgUrl} />
			<PreviewInfoContainer>
				<Title>{title}</Title>
				<AddedBy>added by <AddedByName>{addedBy}</AddedByName></AddedBy>
			</PreviewInfoContainer>
			<RemoveIcon>&#10006;</RemoveIcon>
		</Container>
	);
}

export default PlaylistVideoPreview;