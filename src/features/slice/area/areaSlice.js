import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAreaActive = createAsyncThunk('areas/getAreas', async () => {
  try {
    const { data } = await axios.get(baseUrl + '/Area/Active')
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
      .addCase(getAreaActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default areaSlice.reducer
