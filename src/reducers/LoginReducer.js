import {
    LOGIN_ACCOUNT,
    LOGIN_ACCOUNT_SUCCESS,
    LOGIN_ACCOUNT_FAILED,
    GET_USERNAME,
    LOG_OUT,
    GET_USERNAME_BY_ID
} from '../utils/ActionTypes'


const initialState = {
    isLoading: false,
    authen: false,
    token: null,
    errMessage: '',
    username: ''
};

 export default loginReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_ACCOUNT:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_ACCOUNT_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                authen: action.data.authen,
                token: action.data.token
            };
        case LOGIN_ACCOUNT_FAILED:
            return {
                isLoading: false,
                authen: false,
                token: null,
                errMessage: action.data.message,
                username:''
            };
        case LOG_OUT: 
            return {
                ...state,
                token:null,
                authen: false,
                errMessage:'Logout'
            }
        case GET_USERNAME:
            return {
                ...state,
                username: action.data.username
            }
        default:
            return state;
    }
};