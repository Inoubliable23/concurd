import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchSearchStart, clearSearchResults } from '../../redux/search/search.actions';
import { selectSearchResults } from '../../redux/search/search.selectors';
import SearchResult from '../search-result/search-result.component';

const Container = styled.div`
	position: relative;
`

const SearchInput = styled.input`
	width: 100%;
	padding: 10px;
	color: #000;
`

const SearchDropdown = styled.div`
	position: absolute;
	top: 40px;
	z-index: 1;
	left: 0;
	width: 100%;
	background-color: #fff;
	color: #000;
`

const VideosSearch = ({ searchVideos, searchResults, clearSearchResults, onVideoSelect, blacklist }) => {

	const [searchText, setSearchText] = useState('');

	const handleInputChange = event => {
		const inputValue = event.target.value;
		setSearchText(inputValue);
		if (inputValue.length < 1) {
			clearSearchResults();
			return;
		}

		searchVideos({
			queryString: inputValue
		});
	}

	const handleResultClick = video => {
		setSearchText('');
		clearSearchResults();
		onVideoSelect(video);
	}

	return (
		<Container>
			<SearchInput
				type='text'
				placeholder='Search for Youtube video and add it to the playlist'
				value={searchText}
				onChange={handleInputChange}
			/>
			<SearchDropdown>
				{
					searchResults.map(result => (
						<SearchResult
							key={result.id}
							video={result}
							alreadyAdded={blacklist.indexOf(result.id) !== -1}
							onClick={handleResultClick}
						/>
					))
				}
			</SearchDropdown>
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