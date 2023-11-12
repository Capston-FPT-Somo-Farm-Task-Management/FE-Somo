import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getTaskTypeActive = createAsyncThunk('taskTypeActive/getTaskTypeActive', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/TaskType/Active', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

  const taskTypeActiveSlice = createSlice({
    name: 'taskTypeActive',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTaskTypeActive.pending, (state) => {
          state.loading = true
        })
        .addCase(getTaskTypeActive.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTaskTypeActive.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
    },
  })

  export default taskTypeActiveSlice.reducer