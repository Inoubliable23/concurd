import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from '../menu-item/menu-item.component';
import { selectMyPlaylists } from '../../redux/playlist/playlist.selectors';
import { fetchMyPlaylists } from '../../redux/playlist/playlist.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Container = styled.div`
	height: 100vh;
	min-width: 250px;
	padding: 20px 0;
	background-color: ${props => props.theme.primaryLight};
	box-shadow: 0px 1px 8px rgba(0,0,0,0.2), 0px 3px 3px rgba(0,0,0,0.12), 0px 3px 4px rgba(0,0,0,0.14);
`

const Logo = styled(Link)`
	font-size: 24px;
	letter-spacing: 1px;
	text-align: center;
	color: #EDAB44;
	font-weight: 500;
`

const SectionTitle = styled.div`
	margin-top: 50px;
	margin-bottom: 20px;
	padding-left: 45px;
	font-size: 16px;
`

const Sidebar = ({ user, fetchMyPlaylists, myPlaylists }) => {

	useEffect(() => {
		user && fetchMyPlaylists();
	}, [user, fetchMyPlaylists]);

	return (
		<Container>
			<Logo to={'/'}>concurd</Logo>

			<SectionTitle>Browse</SectionTitle>
			<MenuItem label='Favourites' linkUrl={'/favourites'} iconKey='heart' />
			<MenuItem label='Play History' linkUrl={'/history'} iconKey='history' />

			{
				user &&
				<>
					<SectionTitle>Your Playlists</SectionTitle>
					{
						myPlaylists &&
						myPlaylists.map(playlist => <MenuItem key={playlist.id} label={playlist.name} linkUrl={`/edit/${playlist.id}`} iconKey='playlist' />)
					}
					<MenuItem label={'New Playlist'} linkUrl={'/create'} iconKey='add' />
				</>
			}
		</Container>
	);
}

const mapStateToProps = state => ({
	user: selectCurrentUser(state),
	myPlaylists: selectMyPlaylists(state)
});

const mapDispatchToProps = {
	fetchMyPlaylists
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);