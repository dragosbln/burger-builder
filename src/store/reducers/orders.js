import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false, 
    error: null,
    success: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.BEGIN_SEND_DATA:
            return{
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case actionTypes.SUCCESS_SEND_DATA:
            return{
                ...state,
                loading: false,
                success: true
            }
        case actionTypes.FAILURE_SEND_DATA:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.SUCCESS_FETCH_DATA:
            return{
                ...state,
                loading: false,
                success: true,
                orders: [...action.orders]
            }
        case actionTypes.BEGIN_FETCH_DATA:
            return{
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case actionTypes.FAILURE_FETCH_DATA:
            return{
                ...state,
                loading: false,
                error: state.error
            }
        default:
            return state;
    }
}

export default reducer;