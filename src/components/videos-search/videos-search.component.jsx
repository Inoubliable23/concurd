import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchSearchStart, clearSearchResults } from '../../redux/search/search.actions';
import SearchDropdown from '../search-dropdown/search-dropdown.component';
import { selectSearchResults } from '../../redux/search/search.selectors';

const Container = styled.div`
	position: relative;
`

const SearchInput = styled.input`
	width: 100%;
	padding: 10px;
	color: #000;
`

const SearchDropdownContainer = styled.div`
	position: absolute;
	top: 40px;
	z-index: 1;
	left: 0;
	width: 100%;
`

const VideosSearch = ({ searchVideos, searchResults, clearSearchResults }) => {

	const handleInputChange = event => {
		const queryString = event.target.value;
		if (queryString.length < 2) {
			clearSearchResults();
			return;
		}

		searchVideos(queryString);
	}

	return (
		<Container>
			<SearchInput
				type='text'
				placeholder='Search for Youtube video and add it to the playlist'
				onChange={handleInputChange}
			/>
			<SearchDropdownContainer>
				<SearchDropdown searchResults={searchResults} />
			</SearchDropdownContainer>
		</Container>
	);
}

const mapStateToProps = state => ({
	searchResults: selectSearchResults(state)
});

const mapDispatchToProps = {
	searchVideos: fetchSearchStart,
	clearSearchResults
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosSearch);