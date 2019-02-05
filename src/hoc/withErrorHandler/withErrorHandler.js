import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component{ 
        state={
            error: null
        }

        componentWillMount(){
            this.reqInt = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            this.resInt = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInt);
            axios.interceptors.response.eject(this.resInt);
        }

        errorConfirmed = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <>
                    <Modal show={this.state.error}
                        cancel={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
                );
        }  
    }
}

export default withErrorHandler; 