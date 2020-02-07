import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authRedirect = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path
    }
}

export const authExpiration = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime * 1000);
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        localId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const req = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.REACT_APP_FIREBASE_API_KEY
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.REACT_APP_FIREBASE_API_KEY
        }

        axios.post(url, req)
            .then(res => {
                console.log(res)
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)

                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(authExpiration(res.data.expiresIn))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(authFailed(error.response.data.error))
            })
    }
}

export const onTrySignIn = () => {
    return dispatch => {

        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if(!token){
            return dispatch(logOut())
        }

        if( expirationDate < new Date()){
            return dispatch(logOut())
        }
        else {
            if (token){
                const expiresIn = expirationDate.getTime() - new Date().getTime()
                dispatch(authSuccess(token, userId))
                dispatch(authExpiration(expiresIn/1000))
            }
        }
    }
}