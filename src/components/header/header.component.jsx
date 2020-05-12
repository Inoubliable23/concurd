import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { googleSignIn } from '../../redux/user/user.actions';
import LoginDropdown from '../login-dropdown/login-dropdown.component';
import HeaderSearch from '../header-search/header-search.component';

const Container = styled.div`
	display: flex;
	border-bottom: 2px solid ${props => props.theme.primaryLight};
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
			<HeaderSearch />
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