import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const Container = styled.div`
	display: flex;
	border-bottom: 2px solid #1B1B36;
`

const SearchContainer = styled.div`
	flex: 1;
	display: flex;
	padding: 15px 30px;
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
  color: #9A9AAB;

	::placeholder {
		color: #9A9AAB;
		opacity: 1;
	}
`

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	font-size: 14px;
	border-left: 2px solid #1B1B36;
`

const Header = ({ userId }) => {
	return (
		<Container>
			<SearchContainer>
				<SearchIconContainer>
					<SearchIcon />
				</SearchIconContainer>
				<Search type='text' placeholder='Search Playlist' />
			</SearchContainer>
			<LoginContainer>
				{userId}
			</LoginContainer>
		</Container>
	);
}

const mapStateToProps = state => ({
	userId: selectCurrentUserId(state)
});

export default connect(mapStateToProps)(Header);