import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import BuildContext from '../../context/buildContext'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/orderSummary/orderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { Route } from 'react-router-dom'
import Checkout from '../Checkout/Checkout'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 2,
    bacon: 1.5,
    cheese: 1
}

class BurgerBuilder extends Component {
    state = {
        purchaseMode: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        //     axios.get('/ingredients.json').then(res => this.setState({ ingredients: res.data }))
        //         .catch(e => { this.setState({ error: "Ingredients can not be fetched" }) })
        //     console.log(this.props)
        this.props.initializePurchasing()
        this.props.initializeIngredients()
    }

    purchasableHandler = () => {
        const ingredients = {
            ...this.props.ingredients
        }

        const purchasable = Object.values(ingredients).some((value) => value > 0)
        return purchasable
    }

    purchaseModeHandler = () => {
        this.setState((prevState) => {
            return { purchaseMode: !prevState.purchaseMode }
        })

        if(!this.props.isAuthanticated){
            console.log()
            this.props.authRedirectPath('/checkout')
            this.props.history.push({
                pathname: '/auth',
            })
        }
    }

    purchaseCompleted = () => {
        this.setState({ loading: true })
        this.props.history.push({
            pathname: '/checkout',
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount + 1
        const newIngredients = { ...this.state.ingredients }
        newIngredients[type] = newCount

        const oldPrice = this.state.totalPrice
        const priceAddition = INGREDIENT_PRICES[type]
        const newPrice = oldPrice + priceAddition

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        }, () => {
            this.purchasableHandler()
        })

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount === 0) {
            return;
        }

        const newCount = oldCount - 1
        const newIngredients = { ...this.state.ingredients }
        newIngredients[type] = newCount

        const oldPrice = this.state.totalPrice
        const priceAddition = INGREDIENT_PRICES[type]
        const newPrice = oldPrice - priceAddition

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        }, () => {
            this.purchasableHandler()
        })
    }

    render() {
        const disabledButtons = { ...this.props.ingredients }
        for (let key in disabledButtons) {
            disabledButtons[key] = disabledButtons[key] <= 0
        }

        const burgerComponent = this.props.ingredients ? <Burger ingredients={this.props.ingredients} /> :
            this.props.error ? <p> {this.props.error} </p> : <Spinner />

        const buildControlsComponenet = this.props.ingredients ? <BuildControls
            price={this.props.totalPrice}
            purchasable={this.purchasableHandler()}
            purchaseModeHandler={this.purchaseModeHandler}
            isAuthanticated={this.props.isAuthanticated} /> : null

        return (
            <Aux>
                <Modal show={this.state.purchaseMode}>
                    {this.state.loading || !this.props.ingredients ? <Spinner /> : <OrderSummary
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        backDropClick={this.purchaseModeHandler}
                        purchaseCompleted={this.purchaseCompleted} />}
                </Modal>

                {burgerComponent}

                <BuildContext.Provider value={{
                    addIngredientHandler: this.props.addIngredientHandler,
                    removeIngredientHandler: this.props.removeIngredientHandler,
                    disabledButtons: disabledButtons
                }}>
                    {buildControlsComponenet}

                </BuildContext.Provider>
                <Route path="/checkout" render={() => <Checkout ingredients={this.props.ingredients} />} />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ing.ingredients,
        totalPrice: state.ing.totalPrice,
        error: state.ing.error,
        isAuthanticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (type) => dispatch(actionCreators.addIng(type)),
        removeIngredientHandler: (type) => dispatch(actionCreators.removeIng(type)),
        initializeIngredients: () => dispatch(actionCreators.fetchIng()),
        initializePurchasing: () => dispatch(actionCreators.initializePurchasing()),
        authRedirectPath: (path) => dispatch(actionCreators.authRedirect(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))