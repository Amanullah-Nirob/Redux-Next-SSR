import { combineReducers, AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper"
import authSlice from "./slices/authSlice";
import playerSlice from "./slices/playerSlice";
import trackPageSlice from "./slices/trackPageSlice";
import tracksSlice from "./slices/tracksSlice";


const rootReducer = combineReducers({
    tracks: tracksSlice,
    player: playerSlice,
    auth: authSlice,
    trackPage: trackPageSlice
})


const masterReducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = { ...state, ...action.payload }
        return nextState
    }
    else {
        return rootReducer(state, action)
    }
}


export const makeStore = () => {
    return configureStore({
        reducer: masterReducer as typeof rootReducer
    })
}



export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<AppStore['getState']>


export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true })