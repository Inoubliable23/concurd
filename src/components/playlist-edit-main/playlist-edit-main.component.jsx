import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as PlaylistIcon } from '../../assets/icons/playlist.svg';
import { setDraftData } from '../../redux/playlist/playlist.actions';

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

const ImagePlaceholder = styled.div`
	height: 100%;
	color: ${props => props.theme.subtext};
	padding-left: 20px;
`

const ImageEditOverlay = styled.div`
	position: absolute;
	top: 0;
	padding: 60px;
	background-color: rgba(0, 0, 0, 0.4);
	opacity: 0;
	z-index: 1;
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
	color: ${props => props.theme.subtext};
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

const PlaylistEditMain = ({ playlist: { name, description, imageUrl}, playlistDraft, setDraftData, editMode, setEditMode }) => {

	const inputFile = useRef(null);

	const [imagePreview, setImagePreview] = useState(imageUrl);

	const handleEditingClick = () => {
		setEditMode(true);
	}

	const handleImageEditClick = () => {
		inputFile.current.click();
	};
	
	const handleFileChange = event => {
		event.stopPropagation();
		event.preventDefault();

		const imgFile = event.target.files[0];
		setDraftData({
			image: imgFile
		});

		setImagePreview(URL.createObjectURL(imgFile));
	}
	
	const handleNameChange = event => {
		setDraftData({
			name: event.target.value
		});
	}
	
	const handleDescriptionChange = event => {
		setDraftData({
			description: event.target.value
		});
	}

	return (
		<Container>
			{
				editMode ?
				<>
					<ImageContainer>
						{
							imagePreview ?
							<Image src={imagePreview} />
							:
							<ImagePlaceholder>
								<PlaylistIcon />
							</ImagePlaceholder>
						}
						<ImageEditOverlay onClick={handleImageEditClick}>
							<EditIcon />
						</ImageEditOverlay>
						<FakeImageInput
							type='file'
							accept='image/*'
							ref={inputFile}
							onChange={handleFileChange}
						/>
					</ImageContainer>
					<MainInfoRight>
						<Input
							type='text'
							placeholder='Playlist Name'
							required
							value={playlistDraft.name || name}
							onChange={handleNameChange}
						/>
						<Input
							type='text'
							placeholder='Description'
							value={playlistDraft.description || description}
							onChange={handleDescriptionChange}
						/>
					</MainInfoRight>
				</>
				:
				<>
					<ImageContainer>
						{
							imagePreview ?
							<Image src={imagePreview} />
							:
							<ImagePlaceholder>
								<PlaylistIcon />
							</ImagePlaceholder>
						}
					</ImageContainer>
					<MainInfoRight>
						<PlaylistNamePretext>PLAYLIST</PlaylistNamePretext>
						<Name>{name}</Name>
						<Description>{description}</Description>
						<EditIconContainer onClick={handleEditingClick}>
							<EditIcon />
						</EditIconContainer>
					</MainInfoRight>
				</>
			}
		</Container>
	);
}

const mapDispatchToProps = {
	setDraftData
};

export default connect(null, mapDispatchToProps)(PlaylistEditMain);