import {
    GET_CATEGORY,
    GET_CATEGORY_FAILED,
    GET_RANDOM_CATEGORY,
    GET_CATEGORIES
} from '../utils/ActionTypes'

const initialState = {
    swipers: [],
    categories: [],
    isLoading: false
};

export default categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case GET_CATEGORIES:
            return {
                ...state,
                isLoading: false,
                categories: [...action.data],
            }
        case GET_RANDOM_CATEGORY:
            return {
                ...state,
                isLoading: false,
                swipers: [...action.data]
            }
        case GET_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                categories: []
            }
        default:
            return state;
    }
}