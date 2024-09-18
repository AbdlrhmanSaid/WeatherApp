import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("weather/getData", async (location) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=cce56b688fec451d8f0125504241309&q=${location}&days=7&aqi=yes&alerts=yes`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
});

const initialState = {
  weatherData: null,
  location: "",
  error: "",
  loading: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLocation } = weatherSlice.actions;

export default weatherSlice.reducer;
