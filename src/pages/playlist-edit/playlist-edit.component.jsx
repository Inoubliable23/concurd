import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlaylistEditMain from '../../components/playlist-edit-main/playlist-edit-main.component';
import PlaylistEditVideos from '../../components/playlist-edit-videos/playlist-edit-videos.component';
import { selectPlaylistById, selectPlaylistDraft } from '../../redux/playlist/playlist.selectors';
import { fetchPlaylist, savePlaylistEdit } from '../../redux/playlist/playlist.actions';
import CustomButton from '../../components/custom-button/custom-button.component';

const Container = styled.div`
	flex: 1;
	padding: 20px;
`

const SaveButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
`

const PlaylistEdit = ({ match, fetchPlaylist, playlist, playlistDraft, savePlaylistEdit }) => {

	const playlistId = match.params.playlistId;

	const [editMode, setEditMode] = useState(false);
	
	useEffect(() => {
		fetchPlaylist({
			playlistId: playlistId
		});
	}, [fetchPlaylist, playlistId]);
	
	const handleSave = event => {
		event.preventDefault();

		savePlaylistEdit(playlistId);
		setEditMode(false);
	}

	return (
		<Container>
			{
				playlist &&
				<>
					<PlaylistEditMain
						key={playlist.id}
						playlist={playlist}
						playlistDraft={playlistDraft}
						editMode={editMode}
						setEditMode={setEditMode}
					/>
					<PlaylistEditVideos
						playlistId={playlist.id}
						playlistVideos={playlist.videos}
						draftVideos={playlistDraft.videos}
					/>
					<SaveButtonContainer>
						<CustomButton
							text='Save'
							onClick={handleSave}
						/>
					</SaveButtonContainer>
				</>
			}
		</Container>
	);
}

const mapStateToProps = (state, props) => ({
	playlist: selectPlaylistById(state, props.match.params.playlistId),
	playlistDraft: selectPlaylistDraft(state)
});

const mapDispatchToProps = {
	fetchPlaylist,
	savePlaylistEdit
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistEdit));