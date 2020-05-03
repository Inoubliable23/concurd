import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { ReactComponent as HistoryIcon } from '../../assets/icons/history.svg';
import { ReactComponent as PlaylistIcon } from '../../assets/icons/playlist.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';

const Container = styled(NavLink)`
	display: flex;
	align-items: center;
	padding: 15px 45px;
	margin-right: 30px;
	font-size: 15px;
	border-radius: 0 30px 30px 0;
	color: #9A9AAB;
	cursor: pointer;
	transition: all 0.1s ease-out;

	&:hover {
		background-color: #F5A623;
		color: #fff;
	}

	&.active {
		background-color: #F5A623;
		color: #fff;
	}
`

const IconContainer = styled.div`
	width: 22px;
	height: 22px;
	margin-right: 20px;
`

const iconMap = {
	'heart': <HeartIcon />,
	'history': <HistoryIcon />,
	'playlist': <PlaylistIcon />,
	'add': <AddIcon />,
}

const MenuItem = ({ label, iconKey, linkUrl }) => {
	return (
		<Container exact to={linkUrl ? linkUrl : '/'}>
			<IconContainer>
				{iconMap[iconKey]}
			</IconContainer>
			{label}
		</Container>
	);
}

export default MenuItem;