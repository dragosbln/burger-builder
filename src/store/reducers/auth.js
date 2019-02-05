import * as actionTypes from '../actions/actionTypes'

const initialState = {
    tokenId: null,
    userId: null, 
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.BEGIN_AUTH:
            return {
                ...state,
                loading: true, 
                error: null
            };
        case  actionTypes.SUCCESS_AUTH:
            return{
                ...state,
                loading: false,
                tokenId: action.tokenId,
                userId: action.userId
            }
        case actionTypes.FAILURE_AUTH:
            return{
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                tokenId: null,
                userId: null
            }
        default: 
            return state;
    }
}

export default reducer;