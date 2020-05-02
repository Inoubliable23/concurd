import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PlaylistCreateMain from '../../components/playlist-create-main/playlist-create-main.component';
import PlaylistCreateVideos from '../../components/playlist-create-videos/playlist-create-videos.component';
import { creatingStart } from '../../redux/playlist/playlist.actions';

const Container = styled.div`
	flex: 1;
	padding: 20px;
`

const PlaylistCreate = ({ creatingStart }) => {

	useEffect(() => {
		creatingStart();
	}, [creatingStart]);

	return (
		<Container>
			<PlaylistCreateMain />
			<PlaylistCreateVideos />
		</Container>
	);
}

const mapDispatchToProps = {
	creatingStart
};

export default connect(null, mapDispatchToProps)(PlaylistCreate);