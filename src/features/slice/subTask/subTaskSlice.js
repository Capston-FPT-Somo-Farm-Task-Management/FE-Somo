import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";

export const getSubTasksByTaskId = createAsyncThunk(
  'subTasks/getSubTasksByTaskId',
  async (taskId, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(baseUrl + `/FarmSubTask/Task(${taskId})`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return data;
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
);

export const createSubTask = createAsyncThunk("subTasks/createSubTask", async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(baseUrl + `/FarmSubTask/Task`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message)
        console.log(response);
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  });

  export const deleteSubTask = createAsyncThunk(
    'subTasks/deleteSubTask',
    async ({taskId, employeeId}, { rejectWithValue }) => {
      try {
        const response = await axios.put(baseUrl + `/FarmSubTask/Delete/Task(${taskId})/Employee(${employeeId})`)
        return response.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
  

  const subTaskSlice = createSlice({
    name: "subTask",
    initialState: {
      data: [],
      loading: false,
      error: "",
    },
    extraReducers(builder) {
      builder
        .addCase(getSubTasksByTaskId.pending, (state) => {
          state.loading = true;
        })
        .addCase(getSubTasksByTaskId.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getSubTasksByTaskId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(createSubTask.pending, (state) => {
          state.loading = true;
        })
        .addCase(createSubTask.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(createSubTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(deleteSubTask.pending, (state) => {
          state.loading = true
        })
        .addCase(deleteSubTask.fulfilled, (state, action) => {
          state.loading = false
          toast.success(`Xoá thành công`)
          state.data = action.payload
        })
        .addCase(deleteSubTask.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
    },
  });
  
  export default subTaskSlice.reducer;