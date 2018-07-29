import {
    REGISTER_ACCOUNT,
    REGISTER_ACCOUNT_FAILED,
    REGISTER_ACCOUNT_SUCCESSFULL
} from '../utils/ActionTypes'

const initialState = {
    isLoading: false,
    authen: false,
    hasError: false,
    errMessage: ''
};

export default registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ACCOUNT:
            return {
                ...state,
                isLoading: true
            };
        case REGISTER_ACCOUNT_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                authen: action.data.authen
            };
        case REGISTER_ACCOUNT_FAILED:
            return {
                isLoading: false,
                hasError: true,
                authen: false,
                errMessage: action.data
            };
        default:
            return state;
    }
};