import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import CustomButton from '../custom-button/custom-button.component';
import { createPlaylist } from '../../redux/playlist/playlist.actions';
import { connect } from 'react-redux';

const Container = styled.div`
	display: flex;
	padding: 20px;
`

const ImageContainer = styled.div`
	position: relative;
	width: 200px;
	height: 200px;
`

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	background-color: rgba(255, 255, 255, 0.1);
`

const ImageEditOverlay = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	padding: 60px;
	background-color: rgba(0, 0, 0, 0.1);
	opacity: 0;
	cursor: pointer;
	transition: opacity 0.2s;

	&:hover {
		opacity: 1;
	}
`

const MainInfoRightForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const Input = styled.input`
	padding: 5px 7px;
	margin-bottom: 10px;
`

const FakeImageInput = styled.input`
	display: none;
`

const PlaylistCreateMain = ({ createPlaylist }) => {

	const inputFile = useRef(null);

	const [imagePreview, setImagePreview] = useState(null);
	const [playlistData, setPlaylistData] = useState({
		image: null,
		name: '',
		description: ''
	});

	const onButtonClick = () => {
		inputFile.current.click();
	};
	
	const onFileChange = event => {
		event.stopPropagation();
		event.preventDefault();

		const imgFile = event.target.files[0];
		setPlaylistData({
			...playlistData,
			image: imgFile
		});

		setImagePreview(URL.createObjectURL(imgFile));
	}
	
	const onNameChange = event => {
		setPlaylistData({
			...playlistData,
			name: event.target.value
		});
	}
	
	const onDescriptionChange = event => {
		setPlaylistData({
			...playlistData,
			description: event.target.value
		});
	}
	
	const handleSubmit = event => {
		event.preventDefault();

		createPlaylist(playlistData);
	}

	return (
		<Container>
			<ImageContainer>
				<Image src={imagePreview} />
				<ImageEditOverlay onClick={onButtonClick}>
					<EditIcon />
				</ImageEditOverlay>
				<FakeImageInput
					type='file'
					accept='image/*'
					ref={inputFile}
					onChange={onFileChange}
				/>
			</ImageContainer>
			<MainInfoRightForm onSubmit={handleSubmit}>
				<Input
					type='text'
					placeholder='Playlist Name'
					required
					value={playlistData.name}
					onChange={onNameChange}
				/>
				<Input
					type='text'
					placeholder='Description'
					value={playlistData.description}
					onChange={onDescriptionChange}
				/>
				<CustomButton
					type='submit'
					text='Save'
				/>
			</MainInfoRightForm>
		</Container>
	);
}

const mapDispatchToProps = {
	createPlaylist
};

export default connect(null, mapDispatchToProps)(PlaylistCreateMain);