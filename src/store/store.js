import RootReducer from '../reducers/RootReducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

const Store = createStore(RootReducer, applyMiddleware(thunk,promise));

export default Store;