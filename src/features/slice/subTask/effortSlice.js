import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";

export const getEffort = createAsyncThunk(
    'effort/getEffort',
    async (taskId, {rejectWithValue}) => {
      try {
        const { data } = await axios.get(baseUrl + `/FarmSubTask/Task(${taskId})/Effort`, {
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

  export const updateEffort = createAsyncThunk(
    'effort/updateEffort',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          baseUrl + `/FarmSubTask/Task(${id})`
        );
        if (response.status === 200) {
          toast.success("Cập nhật thành công");
        }
        return response.data
      } catch (error) {
        toast.error(error.response.data.message)
        return rejectWithValue(error)
      }
    }
  )

  const effortSlice = createSlice({
    name: "effort",
    initialState: {
      data: [],
      loading: false,
      error: "",
    },
    extraReducers(builder) {
      builder
        .addCase(getEffort.pending, (state) => {
          state.loading = true;
        })
        .addCase(getEffort.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getEffort.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateEffort.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateEffort.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(updateEffort.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  
  export default effortSlice.reducer;