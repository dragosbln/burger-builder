import React, {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import {connect} from 'react-redux'
import {authenticate} from '../../store/actions/'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'


class Auth extends Component {
    state = {
        signupMode: true, 
        formConfig: {
            email: {
                inputtype: 'input',
                config:{
                    type: 'email',
                    placeholder: 'Your email',
                    name: 'email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                }, 
                valid: false,
                touched: false
            },
            password: {
                inputtype: 'input',
                config:{
                    type: 'password',
                    placeholder: 'Your password',
                    name: 'password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                }, 
                valid: false,
                touched: false
            },
        }
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
        if(validation.isEmail !== undefined){
            const pattern=/[A-Za-z0-9.]+@[A-Za-z0-9]+\.[[A-Za-z]+/;
            if(!pattern.test(value))
                return false;
        }

        return true;
    }
    checkForm = (formConfig) => {
        for(let id in formConfig){
            if(!formConfig[id].valid){
                return false;
            }
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.formConfig.email.value, this.state.formConfig.password.value, this.state.signupMode);
    }

    switchModeHnadler = () => {
        this.setState({signupMode: !this.state.signupMode});
    }




    render(){
        const inputs=[];
        for(let key in this.state.formConfig){
            inputs.push({
                id: key,
                elemConfig: this.state.formConfig[key]
            });
        }

        let form = inputs.map(input => {
                    return <Input key={input.id} 
                            inputtype={input.elemConfig.inputtype} 
                            value={input.elemConfig.value} 
                            {...input.elemConfig} 
                            onChange={(event) => this.inputChangedHandler(event, input.id)}
                            invalid={!input.elemConfig.valid}
                            touched={input.elemConfig.touched} />
                    })
        if(this.props.loading){
            form = <Spinner />
        }

        let errMsg=null;

        if(this.props.error){
            errMsg = <p>{this.props.error.message}</p>
        }

        return (
            <>
                {this.props.authenticated ? <Redirect to='/' /> : null}
                <div className={classes.Auth}>
                {errMsg}
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button disabled={!this.state.validForm} type='Success'>SUBMIT</Button>
                </form>
                <Button onClick={this.switchModeHnadler} type='Danger'>Switch to {this.state.signupMode ? 'LOG IN' : 'SIGN UP'}</Button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    loading: state.auth.loading,
    authenticated: state.auth.tokenId !== null
})

const mapDispatchToProps = (dispatch) => ({
    authenticate: (email, password, signupMode) => dispatch(authenticate(email, password, signupMode))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);