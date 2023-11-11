import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";
import { authServices } from "services/authServices";

export const getTaskById = createAsyncThunk(
    "taskById/getTaskById",
    async (taskId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(baseUrl + `/FarmTask/${taskId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return data;
      } catch (error) {
        rejectWithValue(error.message);
      }
    }
  );

  const taskByIdSlice = createSlice({
    name: "taskById",
    initialState: {
      data: [],
      loading: false,
      error: "",
      totalPages: 0,
    },
    extraReducers(builder) {
      builder
        .addCase(getTaskById.pending, (state) => {
          state.loading = true;
        })
        .addCase(getTaskById.fulfilled, (state, action) => {
          state.loading = false;
          state.error = "";
          state.data = action.payload;
        })
        .addCase(getTaskById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.data = [];
        })
    },
  });
  
  export default taskByIdSlice.reducer;