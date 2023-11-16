import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAxiosInstance } from "features/api/axiosInstance";
import { toast } from "react-toastify";

const axiosInstance = createAxiosInstance();

export const getSubTasksByTaskId = createAsyncThunk(
  "subTasks/getSubTasksByTaskId",
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/FarmSubTask/Task(${taskId})`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createSubTask = createAsyncThunk(
  "subTasks/createSubTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/FarmSubTask`, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      rejectWithValue(error);
    }
  }
);

export const updateSubTask = createAsyncThunk(
  "subTask/updateSubTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmSubTask/(${data.subTaskId})`,
        data.body
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      rejectWithValue(error);
    }
  }
);

export const updateEffortBySubTask = createAsyncThunk(
  "effortBySubTask/updateEffortBySubTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmSubTask/(${data.subTaskId})/Effort`,
        data.body
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        return response.data.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      rejectWithValue(error);
    }
  }
);

export const deleteSubTask = createAsyncThunk(
  "subTasks/deleteSubTask",
  async ({ subTaskId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/FarmSubTask/Delete(${subTaskId})`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
      .addCase(updateSubTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubTask.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEffortBySubTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEffortBySubTask.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateEffortBySubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubTask.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`Xoá thành công`);
        state.data = action.payload;
      })
      .addCase(deleteSubTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subTaskSlice.reducer;
