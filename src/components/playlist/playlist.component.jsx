import React from 'react';
import styled from 'styled-components';

import PlaylistVideoPreview from '../playlist-video-preview/playlist-video-preview.component';

const Container = styled.div`
	flex: 1;
	padding: 10px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 8px;
	}
		
	&::-webkit-scrollbar-thumb {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		background-color: #505050;
	}
`

const Playlist = () => {

	const videos = [
		{
			id: '1',
			title: 'Kingston - Alle Alle',
			addedBy: 'Jernej Lipovec',
			imgUrl: 'https://img.youtube.com/vi/Uvt3DIgxNsc/0.jpg'
		},
		{
			id: '2',
			title: 'Nipke - Všeč tko k je',
			addedBy: 'Tim Janželj',
			imgUrl: 'https://img.youtube.com/vi/7wNPJJoIzP4/0.jpg'
		},
		{
			id: '3',
			title: 'Challe Salle - Lagano',
			addedBy: 'Jakob Makovec',
			imgUrl: 'https://img.youtube.com/vi/JaPwLN5-21o/0.jpg'
		},
		{
			id: '4',
			title: 'Challe Salle - Lagano',
			addedBy: 'Jakob Makovec',
			imgUrl: 'https://img.youtube.com/vi/JaPwLN5-21o/0.jpg'
		}
	];

	return (
		<Container>
			{
				videos.map(video => <PlaylistVideoPreview key={video.id} {...video} />)
			}
		</Container>
	);
}

export default Playlist;