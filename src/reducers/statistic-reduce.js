import * as actionTypes from "../actions/types";

const initialState = {
    statistic: [],
    isLoading: true

}
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_STATISTIC:
            return {
                statistic: action.payload.statistic,
                isLoading: false
            };
        default:
            return state;
    }
}
