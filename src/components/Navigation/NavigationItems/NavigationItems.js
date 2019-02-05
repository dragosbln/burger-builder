import React from 'react'
import classes from './NavigationItems.css'
import NavigatonItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    const authLink = props.authenticated ? <NavigatonItem link="/logout" >Logout</NavigatonItem> : <NavigatonItem link="/auth" >Authenticate</NavigatonItem>;
    return(
        <ul className={classes.NavigationItems}>
            <NavigatonItem link="/">Burger Builder</NavigatonItem>
            {props.authenticated ? <NavigatonItem link="/orders" >Orders</NavigatonItem> : null}
            {authLink}
        </ul>
    )
}

export default navigationItems;