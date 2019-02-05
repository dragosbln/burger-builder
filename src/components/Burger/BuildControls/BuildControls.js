import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'

const controls=[
    {label:"Meat", type:"meat"},
    {label:"Cheese", type:"cheese"},
    {label:"Salad", type:"salad"},
    {label:"Bacon", type:"bacon"},
]

const buildControls = (props) => {
    let button = (
        <button 
            disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.purchaseHandler}>
                ORDER NOW
        </button>
    )
    if(!props.authenticated){
        button = (
            <button 
            disabled={false} 
            className={classes.OrderButton}
            onClick={props.signupHandler}>
                SIGN UP TO CONTINUE
        </button>
        )
    }
    return(
        <div className={classes.BuildControls}>
            <p>Total price: {props.price}</p>
            {controls.map(control=>{
                return <BuildControl key={control.label} label={control.label} disabled={props.disabled[control.type]} onClick={(more)=>props.onClick(more, control.type)} />
            })}
            {button}
        </div>
    )
}

export default buildControls;