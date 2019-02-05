import React from 'react'
import classes from './Order.css'

const order = (props) => {

    const ingrs = Object.keys(props.ingredients).map((ing,i) => {
        return <div key={i} className={classes.Ingredient}> {ing + ': ' +  props.ingredients[ing]} </div>
    });

    return(
        <div className={classes.Order}>
            <div>Ingredients: {ingrs}</div>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
    
}

export default order;