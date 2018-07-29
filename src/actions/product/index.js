import {
    GET_PRODUCT,
    GET_PRODUCT_FAILED,
    GET_RANDOM_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY
} from '../../utils/ActionTypes'

import axios from 'axios'
import { API_URL } from '../../utils/constants'

export function getRandomProduct() {
    return dispatch => {
        dispatch({ type: GET_PRODUCT })
        axios.get(`${API_URL}/products/random`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_RANDOM_PRODUCT, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_PRODUCT_FAILED, data: err.response.data });
            })
    }
}

export function getProducts() {
    return dispatch => {
        dispatch({ type: GET_PRODUCT })
        axios.get(`${API_URL}/products`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_PRODUCTS, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_PRODUCT_FAILED, data: err.response.data });
            })
    }
}

export function getProductsByCategory(categoryId) {
    return dispatch => {
        dispatch({ type: GET_PRODUCT })
        axios.get(`${API_URL}/products/${categoryId}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_PRODUCTS_BY_CATEGORY, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_PRODUCT_FAILED, data: err.response.data });
            })
    }
}

