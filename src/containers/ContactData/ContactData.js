import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { orderStartHandler } from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest'
            },
        }
    }

    inputChangedHandler(event, inputIdentifier) {
        let orderForm = {...this.state.orderForm}
        orderForm[inputIdentifier].value = event.target.value
        this.setState({orderForm: orderForm})
    }

    orderHandler = (event) => {
        event.preventDefault()
        let customer = {}
        Object.keys(this.state.orderForm).map(key => {
            const value = this.state.orderForm[key].value
            return customer[key] = value 
        })
        customer = {...customer}
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer,
            userId: this.props.userId
        }

        this.props.order(order, this.props.token)
    }

    render() {
        const form = <form onSubmit={(event) => this.orderHandler(event)}>
            {Object.keys(this.state.orderForm).map(inputKey => {
                const input = this.state.orderForm[inputKey]
                return <Input key={inputKey} 
                inputtype={input.elementType} 
                config= {input.elementConfig} 
                value={input.value}
                changed={(event) => this.inputChangedHandler(event, inputKey)}/>
            })}
            <Button btnType='Success' > Order </Button>
        </form>
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data </h4>
                {this.props.loading ? <Spinner /> : form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ing.ingredients,
        totalPrice: state.ing.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}   

const mapDispatchtoProps = dispatch => {
    return {
        order: (order,token) => dispatch(orderStartHandler(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(ContactData,axios))