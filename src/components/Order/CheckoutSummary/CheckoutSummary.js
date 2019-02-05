import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>hope its cool lol</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button type='Success' onClick={props.continue}>Continue</Button>
        <Button type='Danger' onClick={props.cancel}>Cancel</Button>
    </div>
);

export default checkoutSummary;