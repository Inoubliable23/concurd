import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PlaylistCreateMain from '../../components/playlist-create-main/playlist-create-main.component';
import PlaylistEditVideos from '../../components/playlist-edit-videos/playlist-edit-videos.component';
import { creatingStart } from '../../redux/playlist/playlist.actions';
import { selectPlaylistDraft } from '../../redux/playlist/playlist.selectors';

const Container = styled.div`
	flex: 1;
	padding: 20px;
`

const PlaylistCreate = ({ creatingStart, playlistDraft }) => {

	useEffect(() => {
		creatingStart();
	}, [creatingStart]);

	return (
		<Container>
			<PlaylistCreateMain />
			<PlaylistEditVideos playlistVideos={[]} draftVideos={playlistDraft.videos} />
		</Container>
	);
}

const mapStateToProps = (state) => ({
	playlistDraft: selectPlaylistDraft(state)
});

const mapDispatchToProps = {
	creatingStart
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCreate);