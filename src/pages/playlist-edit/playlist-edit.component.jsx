import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlaylistEditMain from '../../components/playlist-edit-main/playlist-edit-main.component';
import PlaylistEditVideos from '../../components/playlist-edit-videos/playlist-edit-videos.component';
import { selectPlaylistById } from '../../redux/playlist/playlist.selectors';

const Container = styled.div`
	padding: 20px;
`

const PlaylistEdit = ({ playlist }) => {
	return (
		<Container>
			<PlaylistEditMain {...playlist} />
			<PlaylistEditVideos videos={playlist.videos} />
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	playlist: selectPlaylistById(state, props.match.params.playlistId)
});

export default withRouter(connect(mapStateToProps)(PlaylistEdit));