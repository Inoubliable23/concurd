import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`

const Empty = styled.div`
	color: ${props => props.theme.subtext};
`

const HistoryPage = () => {
	return (
		<Container>
			<Empty>No history to show.</Empty>
		</Container>
	);
}

export default HistoryPage;