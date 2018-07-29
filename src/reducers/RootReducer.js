import loginReducer from './LoginReducer';
import registerReducer from './RegisterReducer';
import {combineReducers} from 'redux'
import categoryReducer from './CategoryReducer';
import productReducer from './ProductReducer';
import itemCategory from './ItemCategory';
import reviewReducer from './ReviewReducer';

const RootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    category: categoryReducer,
    product: productReducer,
    item: itemCategory,
    review: reviewReducer
});

export default RootReducer;