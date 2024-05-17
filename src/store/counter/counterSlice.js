import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addValueApi } from "./counterApi";

const initialState ={
    value : 0,
    disable : false
}

export const addValueAsync = createAsyncThunk("counter/addValueAsync", async (val) => {
    let response =  await addValueApi(val)
    // console.log(response, 'value' );
    if(response && response.status == 200){
        // console.log(response.data);
        return response.data
    }
})
const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        addValue: (state, action) => {
            // console.log(action,"addvalue");
            state.value += action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(addValueAsync.pending, (state) => {
            state.disable = true
        }).addCase(addValueAsync.fulfilled, (state, action) => {
            state.disable = false
            state.value += action.payload
        }).addCase(addValueAsync.rejected, (state, action) => {
            state.disable = false
        })
    }
})

export const { increment, decrement,addValue } = counterSlice.actions
export default counterSlice.reducer