import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getTaskTypePlant = createAsyncThunk('taskTypePlant/getTaskTypePlant', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/TaskType/ListTaskTypePlant', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

  const taskTypePlantSlice = createSlice({
    name: 'taskTypePlant',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTaskTypePlant.pending, (state) => {
          state.loading = true
        })
        .addCase(getTaskTypePlant.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTaskTypePlant.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
    },
  })

  export default taskTypePlantSlice.reducer