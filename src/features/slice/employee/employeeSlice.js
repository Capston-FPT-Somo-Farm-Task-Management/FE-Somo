import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getEmployee = createAsyncThunk('employees/getEmployees', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Employee', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })
export const getEmployeeByTaskTypeAndFarmId = createAsyncThunk('employeeByTaskTypeAndFarmId/getEmployeeByTaskTypeAndFarmId', async ({ taskTypeId, farmId }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Employee/Active/TaskType(${taskTypeId})/Farm(${farmId})`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
      .addCase(getEmployeeByTaskTypeAndFarmId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeByTaskTypeAndFarmId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getEmployeeByTaskTypeAndFarmId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      })
  },
});

export default employeeSlice.reducer;
