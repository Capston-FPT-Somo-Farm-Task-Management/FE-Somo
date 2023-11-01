import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getEmployeeByFarmId = createAsyncThunk(
  'employees/getEmployeeByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUrl + `/Employee/Farm(${id})`)
      return response.data.data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const employeeByFarmSlice = createSlice({
  name: 'employeeByFarm',
  initialState: {
    data: {},
    loading: false,
    error: '',
  },
  reducers: {
    clearEmployeeByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmployeeByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getEmployeeByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default employeeByFarmSlice.reducer
export const { clearEmployeeByFarm } = employeeByFarmSlice.actions
