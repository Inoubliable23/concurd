import styled from 'styled-components';

export const VideoPreviewContainer = styled.div`
	display: flex;
	padding: 10px;

	&:hover {
		background-color: rgba(80, 80, 80, 0.3);
	}
`

export const PreviewImgContainer = styled.div`
	flex: 1;
	min-width: 100px;
`

export const PreviewImg = styled.img`
	width: 100%;
`

export const PreviewInfoContainer = styled.div`
	flex: 4;
	padding: 10px 20px;
`

export const Title = styled.div`
	font-size: 16px;
	margin-bottom: 8px;
`

export const AddedBy = styled.div`
	font-size: 12px;
	font-style: italic;
	font-weight: 500;
`

export const AddedByName = styled.span`
	font-weight: 700;
`

export const RemoveIcon = styled.span`
	height: fit-content;
	padding: 3px 5px;
	cursor: pointer;
`