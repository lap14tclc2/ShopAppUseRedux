import {
    GET_ITEM,
    GET_ITEM_FAILED,
    GET_ITEMS,
    GET_ITEMS_BY_PRODUCT,
    GET_RANDOM_ITEMS
} from '../utils/ActionTypes'

const initialState = {
    items: [],
    isGetAll: true,
    isLoading: false
};

export default itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEM:
            return {
                ...state,
                isLoading: true
            }
        case GET_ITEMS:
            return {
                isLoading: false,
                isGetAll: true,
                items: [...action.data]
            }
        case GET_ITEMS_BY_PRODUCT:
            return {
                isLoading: false,
                isGetAll:false,
                items: [...action.data]
            }
        case GET_ITEM_FAILED:
            return {
                ...state,
                isLoading: false,
                items: []
            }
        default:
            return state;
    }
}