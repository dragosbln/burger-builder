import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const Burger = (props) => {
    let ingrs=Object.keys(props.ingredients).map(igK=>{
        return [...Array(props.ingredients[igK])].map((_,i)=>{
            return <BurgerIngredient key={igK+i} type={igK} />;
        })
    }).reduce((arr,el)=>{return arr.concat(el)},[]);;
    if(ingrs.length===0){
        ingrs=<p>Please, add ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingrs}
            <BurgerIngredient type='bread-bottom' />
        </div>
        )
}

export default Burger;