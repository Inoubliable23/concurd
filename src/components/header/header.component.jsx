import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { googleSignIn } from '../../redux/user/user.actions';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import LoginDropdown from '../login-dropdown/login-dropdown.component';

const Container = styled.div`
	display: flex;
	border-bottom: 2px solid ${props => props.theme.primaryLight};
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
  color: ${props => props.theme.subtext};

	::placeholder {
		color: ${props => props.theme.subtext};
		opacity: 1;
	}
`

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	font-size: 14px;
	border-left: 2px solid ${props => props.theme.primaryLight};
	position: relative;
`

const LoggedInContainer = styled.div`
	display: flex;
	align-items: center;
`

const GoogleSignInButton = styled.button`
  letter-spacing: 0.5px;
  padding: 15px 25px;
  font-size: 14px;
  background-color: #4285f4;
  color: #fff;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
	}
`

const Header = ({ user, signIn }) => {
	return (
		<Container>
			<SearchContainer>
				<SearchIconContainer>
					<SearchIcon />
				</SearchIconContainer>
				<Search type='text' placeholder='Search Playlist' />
			</SearchContainer>
			<LoginContainer>
				{
					user ?
					<LoggedInContainer>
						{user.displayName}
						<LoginDropdown />
					</LoggedInContainer>
					:
					<GoogleSignInButton
						isGoogle
						text='GOOGLE'
						onClick={signIn}
					>
						GOOGLE SIGN IN
					</GoogleSignInButton>
				}
			</LoginContainer>
		</Container>
	);
}

const mapStateToProps = state => ({
	user: selectCurrentUser(state)
});

const mapDispatchToProps = {
	signIn: googleSignIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);