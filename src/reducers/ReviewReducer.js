import {
    GET_REVIEW,
    GET_REVIEW_FAILED,
    GET_REVIEWS_BY_ITEM,
    GET_REVIEWS_BY_USER
} from '../utils/ActionTypes'

const initialState = {
    reviews: [],
    isLoading: false
};

export default reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEW:
            return {
                ...state,
                isLoading: true
            }
        case GET_REVIEWS_BY_ITEM:
            return {
                ...state,
                isLoading: false,
                reviews: [...action.data],
            }

        case GET_REVIEW_FAILED:
            return {
                ...state,
                isLoading: false,
                reviews: []
            }
        default:
            return state;
    }
}