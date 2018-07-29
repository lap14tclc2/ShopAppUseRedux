import axios from 'axios'
import {
    GET_REVIEW,
    GET_REVIEW_FAILED,
    GET_REVIEWS_BY_ITEM,
    GET_REVIEWS_BY_USER
} from '../../utils/ActionTypes'
import { API_URL } from '../..//utils/constants'
import { getToken } from '../../helpers/asyc.helper';

export function getReviewByItem(itemId) {
    return dispatch => {
        dispatch({ type: GET_REVIEW })
        axios.get(`${API_URL}/reviews/review/${itemId}`)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error();
                }
                return res;
            })
            .then(res => {
                dispatch({ type: GET_REVIEWS_BY_ITEM, data: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_REVIEW_FAILED, data: err.response.data });
            })
    }
}

export async function  sendReview(review) {
    const token = await getToken();
    return dispatch => {
        axios({
            method: 'post',
            url: `${API_URL}/reviews`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            data: {
                comment: review.comment,
                rating: review.rating,
                itemId : review.itemId
            }
        }).then(res => {
            dispatch({ type: GET_REVIEWS_BY_ITEM, data: res.data });
        })
            .catch(err => {
                dispatch({ type: GET_REVIEW_FAILED, data: err.response.data });
            })
    }
}

export function getReviewByItemButNotDispatch(itemId) {
    return axios.get(`${API_URL}/reviews/review/${itemId}`)
        .then(res => {
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}

