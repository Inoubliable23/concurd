import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signOut } from '../../redux/user/user.actions';
import { ReactComponent as CaretDownIcon } from '../../assets/icons/caret-down.svg';
import useOutsideClick from '../../hooks/useOutsideClick';

const Container = styled.div`
	margin-left: 13px;
`

const Dropdown = styled.div`
	position: absolute;
	padding: 10px;
	background-color: #fff;
	top: 100%;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`

const SignOutButton = styled.button`
	padding: 15px 35px;
	font-size: 15px;
	background-color: #F5A623;
	color: #fff;
	font-weight: bolder;
	cursor: pointer;

	&:hover {
		background-color: #E39412;
	}
`

const DropdownArrowContainer = styled.div`
	width: 22px;
	height: 22px;
	border-radius: 50%;
	border: 1px solid #fff;
	padding: 2px;
	cursor: pointer;
`

const LoginDropdown = ({ signOut }) => {
	
  const ref = useRef();
	const [isOpen, setOpen] = useState(false);
	
	useOutsideClick(ref, () => setOpen(false));

	const handleSignOutClick = () => {
		signOut();
		setOpen(false);
	}

	return (
		<Container ref={ref}>
			<DropdownArrowContainer onClick={() => setOpen(!isOpen)}>
				<CaretDownIcon />
			</DropdownArrowContainer>
			{
				isOpen &&
				<Dropdown>
					<SignOutButton onClick={handleSignOutClick}>
						Log out
					</SignOutButton>
				</Dropdown>
			}
		</Container>
	);
}

const mapDispatchToProps = {
	signOut
};

export default connect(null, mapDispatchToProps)(LoginDropdown);