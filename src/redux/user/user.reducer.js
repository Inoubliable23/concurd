import produce from 'immer';

const initialState = {
	currentUser: {
		id: '23',
		name: 'Tim Janzelj'
	}
}

export default (state = initialState, { type, payload }) => {
	return produce(state, draft => {
		switch (type) {

			default:
				return draft;
		}
	});
}