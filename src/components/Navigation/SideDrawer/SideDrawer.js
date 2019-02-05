import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
    
    let scls=[classes.SideDrawer, classes.Open];
    if(!props.show){
        scls=[classes.SideDrawer, classes.Close];
    }

    return (
        <>
            <Backdrop show={props.show} 
                    cancel={props.close}/>
            <div className={scls.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems authenticated={props.authenticated} />
                </nav>
            </div>
        </>
    )
}

export default sideDrawer;