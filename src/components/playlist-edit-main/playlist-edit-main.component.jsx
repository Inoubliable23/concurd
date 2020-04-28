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
`

const ImageEditOverlay = styled.div`
	position: absolute;
	top: 0;
	padding: 60px;
	background-color: rgba(0, 0, 0, 0.4);
	opacity: 0;
	cursor: pointer;
	transition: opacity 0.2s;

	&:hover {
		opacity: 1;
	}
`

const MainInfoRight = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const MainInfoRightForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
`

const PlaylistNamePretext = styled.div`
	font-size: 14px;
	margin-bottom: 2px;
`

const Name = styled.div`
	font-weight: 500;
	font-size: 26px;
	letter-spacing: 0.3px;
`

const Description = styled.div`
	font-size: 14px;
	color: #9A9AAB;
	margin-top: 8px;
`

const EditIconContainer = styled.div`
	width: 22px;
	height: 22px;
	margin-top: auto;
	margin-left: auto;
	cursor: pointer;
`

const Input = styled.input`
	padding: 5px 7px;
	margin-bottom: 10px;
`

const FakeImageInput = styled.input`
	display: none;
`

const PlaylistEditMain = ({ name, description, imageUrl, createPlaylist }) => {

	const inputFile = useRef(null);

	const [editMode, setEditMode] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [playlistData, setPlaylistData] = useState({
		image: null,
		name,
		description: description ? description : ''
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

		setEditMode(false);
	}

	return (
		<Container>
			{
				editMode ?
				<>
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
				</>
				:
				<>
					<ImageContainer>
						<Image src={imagePreview} />
					</ImageContainer>
					<MainInfoRight>
						<PlaylistNamePretext>PLAYLIST</PlaylistNamePretext>
						<Name>{playlistData.name}</Name>
						<Description>{playlistData.description}</Description>
						<EditIconContainer onClick={() => setEditMode(true)}>
							<EditIcon />
						</EditIconContainer>
					</MainInfoRight>
				</>
			}
		</Container>
	);
}

const mapDispatchToProps = {
	createPlaylist
};

export default connect(null, mapDispatchToProps)(PlaylistEditMain);