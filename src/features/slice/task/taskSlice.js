import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
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

  export const createTask = createAsyncThunk(
    'plants/createTask',
    async (data, { rejectWithValue }) => {
      console.log(data)
      try {
        const response = await axios.post(baseUrl + '/FarmTask', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        return response.data
      } catch (error) {
        rejectWithValue(error)
      }
    }
  )

  const taskSlice = createSlice({
    name: 'task',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTasks.pending, (state) => {
          state.loading = true
        })
        .addCase(getTasks.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTasks.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
  
        .addCase(createTask.pending, (state) => {
          state.loading = true
        })
        .addCase(createTask.fulfilled, (state, action) => {
          state.loading = false
          state.data.push(action.payload)
        })
        .addCase(createTask.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
    },
  })

  export default taskSlice.reducer