import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";

export const createSubTask = createAsyncThunk("subTasks/createSubTask", async (data) => {
    console.log(data);
    console.log(data.farmTask.memberId);
    try {
      const response = await axios.post(baseUrl + `/FarmSubTask/Task`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  const subTaskSlice = createSlice({
    name: "subTask",
    initialState: {
      data: [],
      loading: false,
      error: "",
    },
    extraReducers(builder) {
      builder
  
        .addCase(createSubTask.pending, (state) => {
          state.loading = true;
        })
        .addCase(createSubTask.fulfilled, (state, action) => {
          if (Array.isArray(state.data)) {
            state.data.push(action.payload.task);
          } else {
            state.data = [action.payload.task];
          }
  
          state.loading = false;
        })
        .addCase(createSubTask.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  
  export default subTaskSlice.reducer;