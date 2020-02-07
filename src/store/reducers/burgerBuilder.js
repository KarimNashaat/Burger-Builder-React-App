import * as actionTypes from '../actions/actionTypes'
import { addIng, removeIng, initializeIng } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_ING:
            return addIng(state, action)
        case actionTypes.REMOVE_ING:
            return removeIng(state, action)
        case actionTypes.INIT_ING:
            return initializeIng(state, action)
        case actionTypes.FETCH_ING_ERROR:
            return { ...state, ...action.e }
        default:
            return state
    }

}

export default reducer