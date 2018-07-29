import {
    GET_PRODUCT,
    GET_PRODUCT_FAILED,
    GET_RANDOM_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY
} from '../utils/ActionTypes'

const initialState = {
    randoms: [],
    products: [],
    isGetAll : true,
    isLoading: false
};

export default productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                isGetAll: true,
                products: [...action.data]
            }
        case GET_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                isLoading: false,
                isGetAll: false,
                products: [...action.data]
            }
        case GET_RANDOM_PRODUCT:
            return {
                ...state,
                isLoading: false,
                isGetAll: false,
                randoms: [...action.data]
            }
        case GET_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                products: []
            }
        default:
            return state;
    }
}