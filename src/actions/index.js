import * as actionTypes from "./types";

/* User Actions */
export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    };
};



export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    };
};


export const setPurchase = info => {
    return {
        type: actionTypes.SET_PURCHASE,
        payload: {
            purchase: info
        }
    };
}

export const setBrand = info => {
    return {
        type: actionTypes.SET_BRAND,
        payload: {
            brand: info
        }
    };
}

export const setStatistic = info => {
    return {
        type: actionTypes.SET_STATISTIC,
        payload: {
            statistic: info
        }
    };
}

export const setInfluencers = info => {
    return {
        type: actionTypes.SET_INFLUENCERS,
        payload: {
            influencer: info
        }
    };
}
