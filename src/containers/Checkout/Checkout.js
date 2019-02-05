import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, withRouter} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux';



class Checkout extends Component{


    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                continue={this.checkoutContinued} 
                                cancel={this.checkoutCancelled} />
                <Route path={this.props.match.url+'/contact-info'} 
                    render={()=>(<ContactData history={this.props.history} />)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burger.ingredients
});

export default withRouter(connect(mapStateToProps)(Checkout));