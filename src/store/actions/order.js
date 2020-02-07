import * as actionTypes from '../../store/actions/actionTypes'
import axios from '../../axios-orders'

export const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId: id,
        orderData
    }
}

export const orderFailed = (error) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error
    }
}

export const startLoading = () => {
    return {
        type: actionTypes.ORDER_STARTED
    }
}

export const orderStartHandler = (order, token) => {
    return dispatch => {
        dispatch(startLoading())
        axios.post('/order.json?auth=' + token, order)
            .then(res => {
                console.log(res)
                dispatch(orderSuccess(res.data.name, order))
            })
            .catch(e => {
                console.log(e)
                dispatch(orderFailed(e))
            })
    }
}

export const initializePurchasing = () => {
    return {
        type: actionTypes.INITIALIZE_PURCHASING
    }
}