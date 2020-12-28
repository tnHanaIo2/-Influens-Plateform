
import { combineReducers } from 'redux';

import { user_reducer } from './reducer'
import purchase from './purchase-reducer'
import brand from './brand-reducer'
import statistic from './statistic-reduce'
import influencer from './influencers-reducer'

const rootReducer = combineReducers({


    user: user_reducer,
    purchase,
    brand,
    statistic,
    influencer


});

export default rootReducer;
