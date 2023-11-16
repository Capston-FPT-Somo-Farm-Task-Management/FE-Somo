import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "features/api/axiosInstance";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance()

export const getEmployeeByTask = createAsyncThunk('employeeByTask/getEmployeeByTask', async (taskId) => {
    try {
      const { data } = await axiosInstance.get(`/FarmSubTask/EmployeeNoSubTask(${taskId})`)
      return data
    } catch (error) {
      console.log(error)
    }
  })

  const employeeByTaskSlice = createSlice({
    name: "subTask",
    initialState: {
      data: [],
      loading: false,
      error: "",
    },
    extraReducers(builder) {
      builder
        .addCase(getEmployeeByTask.pending, (state) => {
          state.loading = true;
        })
        .addCase(getEmployeeByTask.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getEmployeeByTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });

  export default employeeByTaskSlice.reducer;
