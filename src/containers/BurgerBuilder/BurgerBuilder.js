import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux';
import { addIngredient, delIngredient, initIngredients  } from '../../store/actions/';
import Auth from '../Auth/Auth'




class BurgerBuilder extends Component{
    state={
        purchasable: false,
        purchasing: false
    }

    componentDidMount(){
        if(this.props.ingredients === null){
            this.props.initIngredients();
        } else {
            this.setPurchasable(this.props.ingredients, 0);
        }
    }

    setPurchasable(ingredients, dif){
        const sum=Object.keys(ingredients).map(k=>{return ingredients[k];}).reduce((sum, el) => {return sum+el;},0);
        this.setState({purchasable: sum+dif>0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    signupHandler = () => {
        this.props.history.push('/auth')
    }
 
    onClick = (more, type)=>{
        if(more){
            this.props.add(type);
            this.setPurchasable(this.props.ingredients, 1);
        }else if(this.props.ingredients[type]>0){
            this.props.del(type);
            this.setPurchasable(this.props.ingredients, -1);
        }
    }

    render(){
        const disabled = {...this.props.ingredients}
        for(let k in disabled){
            disabled[k]=this.props.ingredients[k]<1;
        }

        
        let orderSummary=null;
        let burger = this.props.error ? <p>Ingredients culdn't be loaded!</p> : <Spinner />;
        if(this.props.ingredients){
            burger = <>
                        <Burger ingredients={this.props.ingredients} />
                        <BuildControls 
                            purchaseHandler={this.purchaseHandler}
                            price={this.props.price} 
                            onClick={this.onClick} 
                            disabled={disabled}
                            signupHandler={this.signupHandler}
                            authenticated={this.props.authenticated}
                            purchasable={this.state.purchasable}/>
                    </>;
            orderSummary = (<OrderSummary continue={this.purchaseContinueHandler} 
                cancel={this.purchaseCancelHandler} 
                ingredients = {this.props.ingredients }/>)

            if(this.state.loading){
                orderSummary=<Spinner />
            }
        }


        return(
            <>
                <Modal cancel={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    error: state.burger.error,
    authenticated: state.auth.tokenId !== null
});

const mapDispatchToProps = (dispatch) => ({
    initIngredients: () => dispatch(initIngredients()),
    add: (ingredient) => dispatch(addIngredient(ingredient)),
    del: (ingredient) => dispatch(delIngredient(ingredient))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));