import * as actionTypes from './actionTypes'
import axios from 'axios'

const beginAuth = () => {
    return{
        type: actionTypes.BEGIN_AUTH
    }
}

const successAuth = (token, userId) => {
    return{
        type: actionTypes.SUCCESS_AUTH,
        tokenId: token,
        userId: userId
    }
}

const failureAuth = (err) => {
    return{
        type: actionTypes.FAILURE_AUTH,
        error: err,
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('expireDate');
    return{
        type: actionTypes.LOGOUT
    }
}

const logoutTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => dispatch(logOut()), timeout)
    }
}

export const authenticate = (email, password, signupMode) => {
    return dispatch => {
        dispatch(beginAuth());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyARRQIseMQ2AQ8-lBy71H4I10LoRcuYs7Q';
        if(!signupMode){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyARRQIseMQ2AQ8-lBy71H4I10LoRcuYs7Q';
        }
        axios.post(url, data)
            .then(response =>{
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                const expireDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expireDate', expireDate);
                dispatch(successAuth(response.data.idToken, response.data.localId));
                dispatch(logoutTimeout(response.data.expiresIn * 1000));
            }).catch(err => {
                console.log(err.response.data.error);
                dispatch(failureAuth(err.response.data.error));
            })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        } else {
            const userId =localStorage.getItem('userId');
            const expireDate = localStorage.getItem('expireDate');
            const expiresIn = (new Date(expireDate)).getTime() - new Date().getTime();
            if(expiresIn < 0){
                dispatch(logOut())
            }else{
                dispatch(successAuth(token, userId));
                dispatch(logoutTimeout(expiresIn));
            }
        }
    }
}