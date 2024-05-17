import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice"
import homeReducer from "./counter/home/homeSlice"
import loginReducer from "./counter/home/loginSlice"

export const store = configureStore({
    reducer: {
        counter : counterReducer,
        product : homeReducer,
        login : loginReducer 
    }
}) 