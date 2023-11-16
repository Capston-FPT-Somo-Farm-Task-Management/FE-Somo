import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "features/api/axiosInstance";
import { baseUrl } from "features/api/baseUrl";

const axiosInstance = createAxiosInstance();

export const getPlantType = createAsyncThunk(
  "plantType/getPlantTypes",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/HabitantType/PlantType/Farm(${id})`
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const createPlantType = createAsyncThunk(
  "plantType/createPlantTypes",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + "/HabitantType", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const plantTypeSlice = createSlice({
  name: "plantType",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(getPlantType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlantType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPlantType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })

      .addCase(createPlantType.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlantType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createPlantType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default plantTypeSlice.reducer;
