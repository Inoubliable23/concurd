import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { selectAllPlaylists } from '../../redux/playlist/playlist.selectors';
import Playlistcard from '../../components/playlist-card/playlist-card.component';
import TopVideosTable from '../../components/top-videos-table/top-videos-table';
import { fetchTopPlaylists } from '../../redux/playlist/playlist.actions';

const Container = styled.div`
	padding: 40px 40px 0;
	flex: 1;
`

const PlaylistsContainer = styled.div``

const Title = styled.div`
	font-size: 22px;
`

const PlaylistCards = styled.div`
	margin-top: 20px;
	display: flex;
`

const TopVideosContainer = styled.div`
	margin-top: 50px;
`

const HomePage = ({ fetchTopPlaylists, playlists }) => {

	useEffect(() => {
		fetchTopPlaylists();
	}, [fetchTopPlaylists]);

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

const mapDispatchToProps = {
	fetchTopPlaylists
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);