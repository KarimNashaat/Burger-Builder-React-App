import * as actionTypes from '../actions/actionTypes'
import { authSuccess } from '../utility'

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    redirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return { ...state, loading: true }
        case actionTypes.AUTH_FAIL:
            return { ...state, loading: false, error: action.error }
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_LOGOUT:
            return initialState
        case actionTypes.AUTH_REDIRECT:
            return {...state, redirectPath: action.path}
        default:
            return state
    }
}

export default reducer