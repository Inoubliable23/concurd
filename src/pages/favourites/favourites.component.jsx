import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`

const Empty = styled.div`
	color: ${props => props.theme.subtext};
`

const FavouritesPage = () => {
	return (
		<Container>
			<Empty>No favourites to show.</Empty>
		</Container>
	);
}

export default FavouritesPage;