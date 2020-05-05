import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchSearchStart, clearSearchResults } from '../../redux/search/search.actions';
import { selectSearchResults } from '../../redux/search/search.selectors';
import { addVideoToCurrentPlaylist } from '../../redux/playlist/playlist.actions';
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

const VideosSearch = ({ searchVideos, searchResults, clearSearchResults, onVideoSelect }) => {

	const handleInputChange = event => {
		const queryString = event.target.value;
		if (queryString.length < 2) {
			clearSearchResults();
			return;
		}

		searchVideos({
			queryString
		});
	}

	const handleResultClick = video => {
		clearSearchResults();
		onVideoSelect(video);
	}

	return (
		<Container>
			<SearchInput
				type='text'
				placeholder='Search for Youtube video and add it to the playlist'
				onChange={handleInputChange}
			/>
			<SearchDropdown>
				{
					searchResults.map(result => (
						<SearchResult
							key={result.id}
							video={result}
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
	clearSearchResults,
	addVideoToCurrentPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosSearch);