import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlaylistEditMain from '../../components/playlist-edit-main/playlist-edit-main.component';
import PlaylistEditVideos from '../../components/playlist-edit-videos/playlist-edit-videos.component';
import { selectPlaylistById } from '../../redux/playlist/playlist.selectors';
import { editingStart } from '../../redux/playlist/playlist.actions';

const Container = styled.div`
	padding: 20px;
`

const PlaylistEdit = ({ playlist, editingStart }) => {

	useEffect(() => {
		editingStart({
			playlistId: playlist.id
		});
	}, [editingStart, playlist.id]);

	return (
		<Container>
			<PlaylistEditMain key={playlist.id} {...playlist} />
			<PlaylistEditVideos />
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	playlist: selectPlaylistById(state, props.match.params.playlistId)
});

const mapDispatchToProps = {
	editingStart
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistEdit));