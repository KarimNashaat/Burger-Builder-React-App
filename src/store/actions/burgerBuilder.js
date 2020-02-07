import * as actionTypes from '../../store/actions/actionTypes'
import axios from '../../axios-orders'

export const addIng = (type) => {
    return {
        type: actionTypes.ADD_ING, ingType: type
    }
}

export const removeIng = (type) => {
    return {
        type: actionTypes.ADD_ING, ingType: type
    }
}

export const initializeIng = (ingredients) => {
    return {
        type: actionTypes.INIT_ING, ingredients
    }
}

export const setError = (e) => {
    return {
        type: actionTypes.FETCH_ING_ERROR, e
    }
}

export const fetchIng = () => {
    return (dispatch) => {
        axios.get('/ingredients.json').then(res => dispatch(initializeIng(res.data)))
            .catch(e => dispatch(setError({ error: "Ingredients can not be fetched" })))
    }
}
