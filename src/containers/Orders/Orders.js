import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {fetchOrders} from '../../store/actions/index'
import {connect} from 'react-redux'

class Orders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        this.props.getOrders(this.props.token);
    }

    render() {
        const orders = this.props.orders.map((order, i) => {
            return <Order key={i} ingredients={order.ingredients} price={order.price} />;
        });
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    orders: state.order.orders,
    token: state.auth.tokenId
})

const mapDispatchToProps = (dispatch) => ({
    getOrders: (token) => dispatch(fetchOrders(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));