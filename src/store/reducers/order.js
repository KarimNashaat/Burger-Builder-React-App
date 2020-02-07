import * as actionTypes from '../actions/actionTypes'
import { updateOrders } from '../utility'

const initialState = {
    loading: false,
    orders: [],
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            return updateOrders(state, action)
        case actionTypes.ORDER_FAILED:
            return { ...state, loading: false}
        case actionTypes.ORDER_STARTED:
            return { ...state, loading: true }
        case actionTypes.INITIALIZE_PURCHASING: 
            return { ...state, purchased: false }
        default:
            return state
    }
}

export default reducer