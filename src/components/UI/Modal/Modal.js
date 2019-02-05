import React, {Component} from 'react'
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {


    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show!==this.props.show || nextProps.children!==this.props.children;
    }

    render(){
        const show = this.props.show ? 'inline' : 'none';

        return (
        <>
            <Backdrop cancel={this.props.cancel} show={this.props.show} />
            <div
                style={{display: show}}
                className={classes.Modal}>
                {this.props.children}
            </div>
        </>
        );
    }
}

export default Modal;