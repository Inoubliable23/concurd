import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectAllPlaylists } from '../../redux/playlist/playlist.selectors';
import Playlistcard from '../../components/playlist-card/playlist-card.component';
import TopVideosTable from '../../components/top-videos-table/top-videos-table';

const Container = styled.div`
	padding: 10px;
`

const PlaylistsContainer = styled.div`
	margin-top: 50px;
`

const Title = styled.div`
	font-size: 24px;
`

const PlaylistCards = styled.div`
	margin-top: 20px;
	display: flex;
`

const TopVideosContainer = styled.div`
	margin-top: 50px;
`

const HomePage = ({ playlists }) => {
	return (
		<Container>
			<PlaylistsContainer>
				<Title>Top Playlists</Title>
				<PlaylistCards>
					{
						playlists.map(playlist => <Playlistcard key={playlist.id} {...playlist} />)
					}
				</PlaylistCards>
			</PlaylistsContainer>
			<TopVideosContainer>
				<Title>Top Videos</Title>
				<TopVideosTable />
			</TopVideosContainer>
		</Container>
	);
}

const mapStateToProps = state => ({
	playlists: selectAllPlaylists(state)
});

export default connect(mapStateToProps)(HomePage);