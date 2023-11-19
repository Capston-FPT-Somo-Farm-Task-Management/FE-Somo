import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const getEmployee = createAsyncThunk(
  'employees/getEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/Employee')
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getEmployeeByTaskTypeAndFarmId = createAsyncThunk(
  'employeeByTaskTypeAndFarmId/getEmployeeByTaskTypeAndFarmId',
  async ({ taskTypeId, farmId }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/Employee/Active/TaskType(${taskTypeId})/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Employee/ChangeStatus/${id}`)
      if (response.status === 200) {
        toast.success('Đổi trạng thái thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
      .addCase(getEmployeeByTaskTypeAndFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeByTaskTypeAndFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getEmployeeByTaskTypeAndFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default employeeSlice.reducer
