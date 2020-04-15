import React from 'react';
import { VideoPreviewContainer, PreviewImg, PreviewInfoContainer, Title, AddedBy, AddedByName, PreviewImgContainer, RemoveIcon } from './playlist-video-preview.styles';

const PlaylistVideoPreview = ({ imgUrl, title, addedBy }) => {
	return (
		<VideoPreviewContainer>
			<PreviewImgContainer>
				<PreviewImg src={imgUrl} />
			</PreviewImgContainer>
			<PreviewInfoContainer>
				<Title>{title}</Title>
				<AddedBy>added by <AddedByName>{addedBy}</AddedByName></AddedBy>
			</PreviewInfoContainer>
			<RemoveIcon>&#10006;</RemoveIcon>
		</VideoPreviewContainer>
	);
}

export default PlaylistVideoPreview;