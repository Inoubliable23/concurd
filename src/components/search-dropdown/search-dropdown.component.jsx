import React from 'react';
import styled from 'styled-components';
import SearchResult from '../search-result/search-result.component';

const Container = styled.div`
	background-color: #fff;
	color: #000;
`

const SearchDropdown = ({ searchResults }) => {
	return (
		<Container>
			{
				searchResults.map(result => <SearchResult key={result.id} video={result} />)
			}
		</Container>
	);
}

export default SearchDropdown;