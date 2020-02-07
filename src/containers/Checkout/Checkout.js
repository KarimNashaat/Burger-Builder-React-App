import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends Component {
    cancelCheckout = () => {
        this.props.history.goBack()
    }

    continueCheckout = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                {this.props.ingredients ? <CheckoutSummary ingredients={this.props.ingredients}
                    cancel={this.cancelCheckout}
                    continue={this.continueCheckout}> </CheckoutSummary> : null}
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />} />
                {this.props.purchased ? <Redirect to="/"/> : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ing.ingredients,
        purchased: state.order.purchased
    }
}   

export default connect(mapStateToProps)(Checkout)