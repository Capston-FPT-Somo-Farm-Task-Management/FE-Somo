import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAreas = createAsyncThunk('areas/getAreas', async () => {
  try {
    const { data } = await axios.get(baseUrl + '/Area')
    // console.log(data)
    return data
  } catch (error) {
    throw error
  }
})

const areaSlice = createSlice({
  name: 'area',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAreas.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreas.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default areaSlice.reducer
