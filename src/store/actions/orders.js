import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

const beginSendData = () => {
    return{
        type: actionTypes.BEGIN_SEND_DATA
    }
}

const successSendData = () => {
    return{
        type: actionTypes.SUCCESS_SEND_DATA
    }
}

const failureSendData = (err) => {
    return{
        type: actionTypes.FAILURE_SEND_DATA,
        error: err
    }
}

export const sendDataToServer = (order, token) => {
    return dispatch => {
        dispatch(beginSendData());
        console.log('token:' + token)
        axios.post("/orders.json?auth="+token,order).then(
            response => {
                dispatch(successSendData());
        })
        .catch(
            err => {
                dispatch(failureSendData(err));
            }
        );
    }
}

const beginFetchData = () => {
    return {
        type: actionTypes.BEGIN_FETCH_DATA
    }
}

const successFetchData = (orders) => {
    return{
        type: actionTypes.SUCCESS_FETCH_DATA,
        orders: orders
    }
}

const failureFetchData = (err) => {
    return{
        type: actionTypes.FAILURE_FETCH_DATA,
        error: err
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        
        dispatch(beginFetchData());
        axios.get('/orders.json?auth='+token)
            .then(res => {
                const orders = [];
                Object.keys(res.data).map(order => { 
                    console.log(order);
                    orders.push(res.data[order]); 
                });
                dispatch(successFetchData(orders));
            })
            .catch(err => {
                dispatch(failureFetchData(err));
            });
    }
}