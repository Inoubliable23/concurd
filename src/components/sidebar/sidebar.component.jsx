import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ThumbsUp } from '../../assets/icons/thumbs-up.svg';

const Container = styled.div`
	height: 100vh;
	width: 250px;
	padding: 25px 0;
	background-color: #1B1B36;
	box-shadow: 0px 1px 8px rgba(0,0,0,0.2), 0px 3px 3px rgba(0,0,0,0.12), 0px 3px 4px rgba(0,0,0,0.14);
`

const Logo = styled.div`
	font-size: 24px;
	letter-spacing: 1px;
	text-align: center;
	color: #EDAB44;
	font-weight: 500;
`

const SectionTitle = styled.div`
	margin-top: 50px;
	margin-bottom: 20px;
	padding-left: 50px;
	font-size: 16px;
`

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	padding: 15px 50px;
	margin-right: 30px;
	font-size: 15px;
	border-radius: 0 30px 30px 0;
	color: #9A9AAB;
	cursor: pointer;
	transition: all 0.2s ease-out;

	&:hover {
		background-color: #F5A623;
		color: #fff;
	}
`

const PlayIcon = styled.div`
	width: 22px;
	height: 22px;
	margin-right: 20px;
`

const Sidebar = () => {
	return (
		<Container>
			<Logo>concurd</Logo>
			<SectionTitle>Your Music</SectionTitle>
			<MenuItem>
				<PlayIcon>
					<ThumbsUp />
				</PlayIcon>
				Playlists
			</MenuItem>
			<MenuItem>
				<PlayIcon>
					<ThumbsUp />
				</PlayIcon>
				Favourite
			</MenuItem>
			<MenuItem>
				<PlayIcon>
					<ThumbsUp />
				</PlayIcon>
				Download
			</MenuItem>
		</Container>
	);
}

export default Sidebar;