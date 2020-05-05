import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as SadFaceIcon } from '../../assets/icons/sad-face.svg';

export const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorIconContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
	color: #EDAB44;
`;

export const ErrorText = styled.h2`
  font-size: 28px;
  color: #fff;
	margin-top: 30px;
`;

class ErrorBoundary extends Component {

	state = {
		hasErrored: false
	}

	static getDerivedStateFromError(error) {
		return {
			hasErrored: true
		}
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<Container>
					<ErrorIconContainer>
						<SadFaceIcon />
					</ErrorIconContainer>
					<ErrorText>Oops. Something went wrong.</ErrorText>
				</Container>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;