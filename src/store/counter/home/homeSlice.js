import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllApiData } from "./homeApi";

const initialState = {
    loader : false,
    data : {}
}

export const getAllData = createAsyncThunk("product/getAllData", async () => {
    const response = await getAllApiData()
    if(response && response.status === 200){
        return response.data
    }
})


const HomeSlice = createSlice({
    name : "product",
    initialState,
    reducer : {},
    extraReducers : (builder) => {
        builder.addCase(getAllData.pending, (state) => {
            state.loader = true
        }).addCase(getAllData.fulfilled, (state, action) => {
            state.loader = false
            state.data = action.payload
        })
    }
})

export default HomeSlice.reducer