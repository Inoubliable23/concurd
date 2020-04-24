import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MenuItem from '../menu-item/menu-item.component';
import { selectMyPlaylists } from '../../redux/playlist/playlist.selectors';

const Container = styled.div`
	height: 100vh;
	width: 250px;
	padding: 25px 0;
	background-color: #1B1B36;
	box-shadow: 0px 1px 8px rgba(0,0,0,0.2), 0px 3px 3px rgba(0,0,0,0.12), 0px 3px 4px rgba(0,0,0,0.14);
`

const Logo = styled.div`
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

const Sidebar = ({ myPlaylists }) => {
	return (
		<Container>
			<Logo>concurd</Logo>

			<SectionTitle>Browse</SectionTitle>
			<MenuItem text='Favourite' iconKey='heart' />
			<MenuItem text='Play History' iconKey='history' />

			<SectionTitle>Your Playlists</SectionTitle>
			{
				myPlaylists.map(playlist => <MenuItem key={playlist.id} text={playlist.name} iconKey='playlist' />)
			}
		</Container>
	);
}

const mapStateToProps = state => ({
	myPlaylists: selectMyPlaylists(state)
});

export default connect(mapStateToProps)(Sidebar);