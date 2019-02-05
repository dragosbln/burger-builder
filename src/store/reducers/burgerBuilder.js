import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    price: 2,
    error: null
}
 
const PRICES={
    meat:1.2,
    cheese:0.5,
    salad:0.2,
    bacon:1
}

const reducer = (state = initialState, action) => {
    let newState=null;
    switch(action.type){
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.newIngredients,
                error: null
            };
        case actionTypes.ADD_INGREDIENT:
            newState={
                ingredients: {
                    ...state.ingredients
                },
                price: state.price + PRICES[action.ingredient]
            }
            newState.ingredients[action.ingredient]+=1;
            return newState;
        case actionTypes.DEL_INGREDIENT:
            newState={
                ingredients: {
                    ...state.ingredients
                },
                price: state.price - PRICES[action.ingredient]
            }
            newState.ingredients[action.ingredient]-=1;
            return newState;
        case actionTypes.SET_INGREDIENTS_FAILED:
            return{
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;