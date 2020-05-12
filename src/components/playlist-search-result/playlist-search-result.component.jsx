import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	padding: 8px 10px;
	background-color: #fff;
	cursor: pointer;

	&:hover {
		background-color: #ddd;
	}
`

const Image = styled.img`
	width: 70px;
	height: 60px;
	object-fit: cover;
`

const InfoContainer = styled.div`
	height: 60px;
	padding: 10px 20px;
	flex: 1;
	overflow: hidden;
`

const Name = styled.div`
	color: #000;
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 5px;
`

const Author = styled.div`
	font-size: 12px;
	color: #888;
`

const PlaylistSearchResult = ({ id, name, author, imageUrl, onClick }) => {
	return (
		<Container onClick={() => onClick(id)}>
			<Image src={imageUrl} />
			<InfoContainer>
				<Name>{name}</Name>
				<Author>{author.name}</Author>
			</InfoContainer>
		</Container>
	)
};

export default PlaylistSearchResult;