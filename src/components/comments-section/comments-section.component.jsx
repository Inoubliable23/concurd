import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addCommentToCurrentPlaylist } from '../../redux/playlist/playlist.actions';
import { selectPlaylistComments } from '../../redux/playlist/playlist.selectors';

const Container = styled.div`
	padding: 30px 20px;
	width: 100%;
	max-width: 1100px;
`

const Title = styled.div`
	font-size: 18px;
	font-weight: 700;
`

const CommentsContainer = styled.div`
	margin-top: 10px;
	border-top: 1px solid ${props => props.theme.subtext};
	border-bottom: 1px solid ${props => props.theme.subtext};
	padding: 10px 0;
	max-height: 300px;
  overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 8px;
		background-color: rgba(200, 200, 200, 0.1);
	}
		
	&::-webkit-scrollbar-thumb {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		background-color: #505050;
	}
`

const Comment = styled.div`
	&:not(:first-of-type) {
		margin-top: 10px;
	}
`

const CommentAuthor = styled.span`
	font-weight: 800;
	font-size: 14px;
`

const CommentText = styled.span`
	font-size: 14px;
`

const CommentInputForm = styled.form`
	width: 100%;
	display: flex;
	margin-top: 10px;
`

const CommentInput = styled.input`
	width: 100%;
	font-size: 14px;
	padding: 8px;
`

const SendButton = styled.button`
	padding: 0 20px;
	font-size: 14px;
	background-color: ${props => props.theme.secondary};
	color: #fff;
  font-weight: bolder;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.secondaryDark};
	}
`

const CommentsSection = ({ comments, addCommentToCurrentPlaylist }) => {

	const [commentText, setCommentText] = useState('');
	
	const handleCommentChange = event => {
		setCommentText(event.target.value);
	}
	
	const handleSubmit = event => {
		event.preventDefault();

		setCommentText('');
		addCommentToCurrentPlaylist(commentText);
	}

	return (
		<Container>
			<Title>Comments</Title>
			{
				comments.length > 0 &&
				<CommentsContainer>
					{
						comments.map(comment => (
							<Comment key={comment.id}>
								<CommentAuthor>{comment.author.name}:</CommentAuthor> <CommentText>{comment.text}</CommentText>
							</Comment>
						))
					}
				</CommentsContainer>
			}
			<CommentInputForm onSubmit={handleSubmit}>
				<CommentInput
					type='text'
					placeholder='Write a comment...'
					required
					value={commentText}
					onChange={handleCommentChange}
				/>
				<SendButton type='submit'>Send</SendButton>
			</CommentInputForm>
		</Container>
	);
}

const mapStateToProps = state => ({
	comments: selectPlaylistComments(state)
});

const mapDispatchToProps = {
	addCommentToCurrentPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);