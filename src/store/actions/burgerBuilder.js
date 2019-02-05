import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        newIngredients: ingredients
    }
}

export const addIngredient = (ingredient) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    }
}

export const delIngredient = (ingredient) => {
    return{
        type: actionTypes.DEL_INGREDIENT,
        ingredient: ingredient
    }
}

const setIngredientsFailed = (err) => {
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED,
        error: err
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burgerbuilder-372c2.firebaseio.com/ingredients.json").then(
            response => {
                dispatch(setIngredients(response.data))
            }
        )
        .catch(
            err => {
                dispatch(setIngredientsFailed(err))
            }
        );
    }
}