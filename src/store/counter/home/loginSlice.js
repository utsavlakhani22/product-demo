import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAPI } from "./homeApi";

const initialState = {
    loader : false,
    token : {}
}

export const loginUser = createAsyncThunk("product/loginUser", async (values) => {
    const response = await loginUserAPI(values)
    // console.log(response?.data);
    if(response && response?.status === 200) {
        // console.log(response)
        localStorage.setItem("token",response?.data?.token)
    }   
})

const loginSlice = createSlice({
    name : "login",
    initialState,
    reducer : {},
    extraReducers : (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loader = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loader = false
            state.token = action.payload
        })
    }
})

export default loginSlice.reducer