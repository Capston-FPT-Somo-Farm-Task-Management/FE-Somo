import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { baseUrl } from 'features/api/baseUrl'

const axiosInstance = createAxiosInstance()

export const getTaskTypeLivestock = createAsyncThunk('taskTypeLivestock/getTaskTypeLivestock', async () => {
    try {
      const { data } = await axiosInstance.get('/TaskType/ListTaskTypeLivestock')
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