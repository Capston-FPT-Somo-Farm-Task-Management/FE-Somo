import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getFieldPlant = createAsyncThunk(
  'fieldPlant/getFieldPlant',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Field/Plant', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const fieldPlantSlice = createSlice({
  name: 'fieldPlant',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getFieldPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldPlant.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldPlantSlice.reducer
