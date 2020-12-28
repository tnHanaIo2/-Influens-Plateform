import * as actionTypes from "../actions/types";

const initialState = {
    purchase: [],
    isLoading: true

}
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_PURCHASE:
            return {
                purchase: action.payload.purchase,
                isLoading: false
            };
        default:
            return state;
    }
}
