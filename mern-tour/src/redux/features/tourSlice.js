import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const createTours= createAsyncThunk("tour/createTour", async ({ upadatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.createTour(upadatedTourData);

        navigate("/")
        toast.success("Tour Added sucessfully");
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

export const getTours= createAsyncThunk("tour/getTours", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getTours();

        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

const tourSlice = createSlice({
    name: "tour",
    initialState: { tour:{}, tours:[] ,userTour:[],error: "", loading: false },
    
    extraReducers: {
        [createTours.pending]: (state, action) => {
            state.loading = true
        },
        [createTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours=[action.payload];
        },
        [createTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours=action.payload;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        

    }
})

export default tourSlice.reducer;
