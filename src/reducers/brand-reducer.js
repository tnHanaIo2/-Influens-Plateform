import * as actionTypes from "../actions/types";

const initialState = {
    brand: [],
    isLoading: true

}
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_BRAND:
            return {
                brand: action.payload.brand,
                isLoading: false
            };
        default:
            return state;
    }
}
