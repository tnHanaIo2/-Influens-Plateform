import * as actionTypes from "../actions/types";

const initialState = {
    influencer: [],
    isLoading: true

}
export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_INFLUENCERS:
            return {
                influencer: action.payload.influencer,
                isLoading: false
            };
        default:
            return state;
    }
}
