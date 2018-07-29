import {
    GET_ITEM,
    GET_ITEM_FAILED,
    GET_RANDOM_ITEMS,
    GET_ITEMS,
    GET_ITEMS_BY_PRODUCT
} from '../../utils/ActionTypes'

import axios from 'axios'
import { API_URL } from '../../utils/constants'

export function getItems() {
    return dispatch => {
        dispatch({ type: GET_ITEM })
        axios.get(`${API_URL}/items/`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_ITEMS, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_ITEM_FAILED, data: err.response.data });
            })
    }
}

// export function getRandomItems() {
//     return dispatch => {
//         dispatch({ type: GET_ITEM })
//         axios.get(`${API_URL}/items/random`)
//             .then(res => {
//                 if (res.status !== 200) {
//                     throw new Error();
//                 }
//                 return res;
//             })
//             .then(res => {
//                 dispatch({ type: GET_RANDOM_ITEMS, data: res.data });
//             })
//             .catch(err => {
//                 dispatch({ type: GET_ITEM_FAILED, data: err.response.data });
//             })
//     }
// }

export function getItemsByProduct(productId) {
    return dispatch => {
        dispatch({ type: GET_ITEM })
        axios.get(`${API_URL}/items/${productId}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_ITEMS_BY_PRODUCT, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_ITEM_FAILED, data: err.response.data });
            })
    }
}



