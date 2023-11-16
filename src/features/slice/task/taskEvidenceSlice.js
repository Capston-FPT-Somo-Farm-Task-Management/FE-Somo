import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "features/api/axiosInstance";
import { baseUrl } from "features/api/baseUrl";

const axiosInstance = createAxiosInstance();

export const getEvidenceByTaskId = createAsyncThunk(
  "evidenceByTaskId/getEvidenceByTaskId",
  async (taskId) => {
    try {
      const { data } = await axiosInstance.get(`/TaskEvidence/Task(${taskId})`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const evidenceByTaskIdSlice = createSlice({
  name: "evidence",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder
      .addCase(getEvidenceByTaskId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEvidenceByTaskId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getEvidenceByTaskId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default evidenceByTaskIdSlice.reducer;
