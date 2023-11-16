import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { baseUrl } from 'features/api/baseUrl'

const axiosInstance = createAxiosInstance()

export const getFarm = createAsyncThunk(
  'farm/getFarm',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/Farm')
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const initialState = {
  data: [],
  loading: false,
  error: '',
  farmId: null,
}

const farmSlice = createSlice({
  name: 'farm',
  initialState,

  reducers: {
    setFarmId: (state, action) => {
      state.farmId = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(getFarm.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getFarm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default farmSlice.reducer
