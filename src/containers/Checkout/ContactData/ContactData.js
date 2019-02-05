import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import {Redirect} from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import {sendDataToServer} from '../../../store/actions/'

class contactData extends Component {
    state={
        validForm: false,
        formConfig: {
            name: {
                inputtype: 'input',
                config:{
                    type: 'text',
                    placeholder: 'Your name',
                    name: 'name'
                },
                value: '',
                validation:{
                    required: true
                }, 
                valid: false,
                touched: false
            },
            city: {
                inputtype: 'input',
                config:{
                    type: 'text',
                    placeholder: 'City',
                    name: 'city'
                },
                value: '',
                validation:{
                    required: true
                }, 
                valid: false,
                touched: false
            },
            street: {
                inputtype: 'input',
                config:{
                    type: 'text',
                    placeholder: 'Street',
                    name: 'street'
                },
                value: '',
                validation:{
                    required: true
                }, 
                valid: false,
                touched: false
            },
            zipcode: {
                inputtype: 'input',
                config:{
                    type: 'text',
                    placeholder: 'ZIP code',
                    name: 'zipcode'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }, 
                valid: false,
                touched: false
            },
            email: {
                inputtype: 'input',
                config:{
                    type: 'email',
                    placeholder: 'E-Mail',
                    name: 'email'
                },
                value: '',
                validation:{
                    required: true
                }, 
                valid: false,
                touched: false
            },
            deliveryMethod:{
                inputtype: 'select',
                config:{
                    options: [
                        {value: "fastest", displayValue: 'Fastest'},
                        {value: "cheapest", displayValue: 'Cheapest'}
                    ]
                }, 
                validation:{},
                valid: true,
                value: ''
            }
        }
    };
    
    orderHandler = (event) => {
        event.preventDefault();
        let formData={};

        for(let id in this.state.formConfig){
            formData[id]=this.state.formConfig[id].value;
        }

        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            costumerData: formData
        }
        
        this.props.sendDataToServer(order, this.props.token);
    }

    checkValid = (value, validation) => {
    
        if(validation.required && value.trim() === ''){
            return false;
        }
        if(validation.minLength && value.length < validation.minLength){
            return false;
        }
        if(validation.maxLength && value.length > validation.maxLength){
            return false;
        }

        return true;
    }

    inputChangedHandler = (event, id) => {
        const updatedFormConfig = {...this.state.formConfig};
        const updatedElemConfig = {...this.state.formConfig[id]};
        updatedElemConfig.value = event.target.value;
        updatedElemConfig.touched=true;
        updatedElemConfig.valid=this.checkValid(updatedElemConfig.value, updatedElemConfig.validation);
        updatedFormConfig[id] = updatedElemConfig;
        const validForm = this.checkForm(updatedFormConfig);
        this.setState({formConfig: updatedFormConfig, validForm: validForm});

    }

    checkForm = (formConfig) => {
        for(let id in formConfig){
            if(!formConfig[id].valid){
                return false;
            }
        }
        return true;
    }

    render(){
        
        const inputs=[];
        for(let key in this.state.formConfig){
            inputs.push({
                id: key,
                elemConfig: this.state.formConfig[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler} >
                {inputs.map(input => {
                    return <Input key={input.id} 
                            inputtype={input.elemConfig.inputtype} 
                            value={input.elemConfig.value} 
                            {...input.elemConfig} 
                            onChange={(event) => this.inputChangedHandler(event, input.id)}
                            invalid={!input.elemConfig.valid}
                            touched={input.elemConfig.touched} />
                })}
                <Button disabled={!this.state.validForm} className={classes.Input} type='Success'>orderrrr</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }
        if(this.props.success){
            form= <Redirect to='/'/>;
        }

        return(
            <div className={classes.ContactData}>
                    <h3>enter ur cdata plss</h3>
                    {form}
            </div>
            )}
    
}

const mapStateToProps = (state) => ({
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    loading: state.order.loading,
    success: state.order.success,
    token: state.auth.tokenId
});

const mapDispatchToProps = (dispatch) => ({
    sendDataToServer: (order, token) => dispatch(sendDataToServer(order, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(contactData);