import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";
import { authServices } from "services/authServices";

export const getTaskForCalendar = createAsyncThunk(
  "taskForCalendar/getTaskForCalendar",
  async ({ date }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        baseUrl +
          `/FarmTask/PageIndex(1)/PageSize(3)/Manager(${authServices.getUserId()})/Date`,
        {
          params: {
            date: date,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const taskForCalendarSlice = createSlice({
  name: "taskForCalendar",
  initialState: {
    data: [],
    loading: false,
    error: "",
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskForCalendar.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskForCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload.data.farmTasks || [];
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getTaskForCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default taskForCalendarSlice.reducer;