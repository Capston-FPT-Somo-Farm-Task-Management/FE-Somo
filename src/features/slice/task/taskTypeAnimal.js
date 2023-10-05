import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getTaskTypeLivestock = createAsyncThunk('taskTypeLivestock/getTaskTypeLivestock', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/TaskType/ListTaskTypeLivestock', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

  const taskTypeLivestockSlice = createSlice({
    name: 'taskTypeLivestock',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTaskTypeLivestock.pending, (state) => {
          state.loading = true
        })
        .addCase(getTaskTypeLivestock.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTaskTypeLivestock.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
    },
  })

  export default taskTypeLivestockSlice.reducer