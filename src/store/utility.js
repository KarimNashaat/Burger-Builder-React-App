const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 2,
    bacon: 1.5,
    cheese: 1
}

export const addIng = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingType]: state.ingredients[action.ingType] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
    }
}

export const removeIng = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingType]: state.ingredients[action.ingType] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
    }
}

export const initializeIng = (state, action) => {
    return {
        ...state,
        ingredients: { ...action.ingredients },
        totalPrice: 4
    }
}

export const updateOrders = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    }
}

export const authSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        token: action.idToken,
        userId: action.localId,
        error: null
    }
}