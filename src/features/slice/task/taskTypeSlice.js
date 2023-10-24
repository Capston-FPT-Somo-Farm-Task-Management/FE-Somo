import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getTaskType = createAsyncThunk('taskType/getTaskType', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/TaskType', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

  const taskTypeSlice = createSlice({
    name: 'taskType',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTaskType.pending, (state) => {
          state.loading = true
        })
        .addCase(getTaskType.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTaskType.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
    },
  })

  export default taskTypeSlice.reducer