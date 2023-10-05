import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getFarm = createAsyncThunk('farm/getFarm', async () => {
  try {
    const { data } = await axios.get(baseUrl + '/Farm')

    return data
  } catch (error) {
    throw error
  }
})

const farmSlice = createSlice({
  name: 'farm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getFarm.pending, (state) => {
        state.loading = true
      })
      .addCase(getFarm.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
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
