import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "features/api/axiosInstance";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();

export const getEffort = createAsyncThunk(
  "effort/getEffort",
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/FarmSubTask/Task(${taskId})/Effort`
      );

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateEffort = createAsyncThunk(
  "effort/updateEffort",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        baseUrl + `/FarmSubTask/Task(${data.taskId})`,
        data.body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

const effortSlice = createSlice({
  name: "effort",
  initialState: {
    data: [],
    loading: false,
    error: null,
    isHaveSubTask: false,
  },
  extraReducers(builder) {
    builder
      .addCase(getEffort.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEffort.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.loading = false;
        state.data = action.payload.data.subtasks || [];
        state.isHaveSubTask = action.payload.data.isHaveSubtask;
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
      });
  },
});

export default effortSlice.reducer;
