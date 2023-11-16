import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "features/api/axiosInstance";
import { baseUrl } from "features/api/baseUrl";
import { toast } from "react-toastify";
import { authServices } from "services/authServices";

const axiosInstance = createAxiosInstance()

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async ({ pageIndex, status, date, taskName,checkTaskParent }, { rejectWithValue }) => {
    try {
      const formattedDate = date ? date.toISOString().split("T")[0] : "";
      const { data } = await axiosInstance.get(
          `/FarmTask/PageIndex(${pageIndex})/PageSize(10)/Manager(${authServices.getUserId()})/Status(${status})/Date?date=${formattedDate}&taskName=${taskName}&checkTaskParent=${checkTaskParent}`
      );
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data, id) => {
    try {
      const response = await axiosInstance.post(
        `/FarmTask?memberId=${authServices.getUserId()}`,
        data
      );
      if (response.status === 200) {
        toast.success("Thêm công việc thành công");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/FarmTask/${data.id}`,
        data.body
      );
      if (response.status === 200) {
        toast.success("Cập nhật thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/FarmTask/DeleteTask/${id}`);
      if (response.status === 200) {
        toast.success("Xóa thành công");
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    data: [],
    loading: false,
    error: "",
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload.data.farmTasks || [];
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }

        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.data)) {
          state.data.push(action.payload.task);
        } else {
          state.data = [action.payload.task];
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
