import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toobar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{
    state={
        showSideDrawer:false
    }

    backdropClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    openSideDrawer = () => {
        this.setState({showSideDrawer: true})
    }


    render(){
        return(
            <>
                <Toolbar authenticated={this.props.authenticated} openSideDrawer={this.openSideDrawer}/>
                <SideDrawer authenticated={this.props.authenticated}
                            show={this.state.showSideDrawer}
                            close={this.backdropClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
} 

const mapStateToProps = (state) => ({
    authenticated: state.auth.tokenId !==null
})


export default connect(mapStateToProps)(Layout);