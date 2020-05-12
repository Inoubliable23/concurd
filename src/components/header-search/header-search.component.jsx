import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import history from '../../history';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import PlaylistSearchResult from '../playlist-search-result/playlist-search-result.component';
import { selectPlaylistsSearchResults } from '../../redux/search/search.selectors';
import { fetchPlaylistsSearchStart, clearPlaylistsSearchResults } from '../../redux/search/search.actions';

const Container = styled.div`
	flex: 1;
	display: flex;
	padding: 15px 30px;
	position: relative;
	z-index: 100;
`

const SearchIconContainer = styled.div`
	width: 26px;
	height: 26px;
`

const Search = styled.input`
	width: 100%;
	font-size: 14px;
	padding: 5px 8px;
	background-color: transparent;
  color: ${props => props.theme.subtext};

	::placeholder {
		color: ${props => props.theme.subtext};
		opacity: 1;
	}
`

const Dropdown = styled.div`
	position: absolute;
	background-color: #fff;
	top: 100%;
	left: 0;
	right: 0;
`

const HeaderSearch = ({ searchPlaylists, searchResults, clearSearchResults }) => {

	const [searchText, setSearchText] = useState('');

	const handleInputChange = event => {
		const inputValue = event.target.value;
		setSearchText(inputValue);
		if (inputValue.length < 1) {
			clearSearchResults();
			return;
		}

		searchPlaylists({
			queryString: inputValue
		});
	}

	const handleClick = playlistId => {
		clearSearchResults();
		setSearchText('')
		history.push(`/playlist/${playlistId}`);
	}

	return (
		<Container>
			<SearchIconContainer>
				<SearchIcon />
			</SearchIconContainer>
			<Search
				type='text'
				placeholder='Search Playlist'
				value={searchText}
				onChange={handleInputChange}
			/>
			<Dropdown>
				{
					searchResults.map(result => (
					<PlaylistSearchResult
						key={result.id}
						{...result}
						onClick={handleClick}
					/>))
				}
			</Dropdown>
		</Container>
	);
}

const mapStateToProps = state => ({
	searchResults: selectPlaylistsSearchResults(state)
});

const mapDispatchToProps = {
	searchPlaylists: fetchPlaylistsSearchStart,
	clearSearchResults: clearPlaylistsSearchResults
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);