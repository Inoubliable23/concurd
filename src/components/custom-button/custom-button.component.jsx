import React from 'react';
import styled from 'styled-components';

export const Container = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  background-color: ${props => props.theme.secondary};
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.secondaryDark};
	}
`

const CustomButton = ({ text, onClick }) => {
	return (
		<Container onClick={onClick}>
			{text}
		</Container>
	);
}

export default CustomButton;