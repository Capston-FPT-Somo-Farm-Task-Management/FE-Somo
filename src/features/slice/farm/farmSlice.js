import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getFarm = createAsyncThunk(
  'farm/getFarm',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/Farm')
      return response.data
    } catch (error) {
      rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  data: [],
  loading: false,
  error: '',
}

const farmSlice = createSlice({
  name: 'farm',
  initialState,

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
