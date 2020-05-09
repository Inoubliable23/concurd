import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlaylistEditMain from '../../components/playlist-edit-main/playlist-edit-main.component';
import PlaylistEditVideos from '../../components/playlist-edit-videos/playlist-edit-videos.component';
import { selectPlaylistById } from '../../redux/playlist/playlist.selectors';
import { editingStart, fetchPlaylist } from '../../redux/playlist/playlist.actions';

const Container = styled.div`
	flex: 1;
	padding: 20px;
`

const PlaylistEdit = ({ match, fetchPlaylist, playlist, editingStart }) => {

	const playlistId = match.params.playlistId;
	
	useEffect(() => {
		fetchPlaylist({
			playlistId: playlistId
		});
		editingStart({
			playlistId: playlistId
		});
	}, [fetchPlaylist, editingStart, playlistId]);

	return (
		<Container>
			<PlaylistEditMain key={playlistId} {...playlist} />
			<PlaylistEditVideos />
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	playlist: selectPlaylistById(state, props.match.params.playlistId)
});

const mapDispatchToProps = {
	fetchPlaylist,
	editingStart
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistEdit));