import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getPriority = createAsyncThunk('priority/getPriority', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/FarmTask', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

  const prioritySlice = createSlice({
    name: 'priority',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getPriority.pending, (state) => {
          state.loading = true
        })
        .addCase(getPriority.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getPriority.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
    },
  })

  export default prioritySlice.reducer