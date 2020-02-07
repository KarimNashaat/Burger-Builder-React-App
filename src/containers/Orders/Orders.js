import React, { Component } from 'react'
import Order from '../../components/order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'

class Orders extends Component {
    state = {
        orders: null,
        loading: true,
        error: null
    }

    componentDidMount() {
        const query = 'auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"'
        axios.get('./order.json?' + query).then(res => {
            this.setState({orders: res.data,
            loading:false})
        }).catch(e => {
            this.setState({loading: false,
            error: "Can not fetch the orders"})
        } )
    }

    render() {
        let orders = null
        if(this.state.orders){
            orders = Object.keys(this.state.orders).map(key => {
                const order = this.state.orders[key]
                return <Order key={key} ingredients={order.ingredients} price={order.price}/>
            })
        }

        return (
            <div>
                {this.state.loading ? <Spinner/> : this.state.error ? <p> {this.state.error} </p> : orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(withErrorHandler(Orders, axios))