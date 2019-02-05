import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
        .map( k => {
            return <li key={k}><span style={{textTransform: "capitalize"}}>{k}</span>: {props.ingredients[k]}</li>
        })

    return (
    <>
        <h3>Order summary:</h3>
        <p>Cool burger with:</p>
        <ul>
            {ingredients}
        </ul>
        <p>Continue to checkout?</p>
        <Button type='Danger' onClick={props.cancel}>NOOOOOOOO</Button>
        <Button type='Success' onClick={props.continue}>YEAAAAAA</Button>

    </>
    );
}

export default orderSummary;