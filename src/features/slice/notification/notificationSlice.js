import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAllNotify = createAsyncThunk(
  'notification/getAllNotify',
  async ({ pageNumber, pageSize, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        baseUrl +
          `/Notification/PageIndex(${pageNumber})/PageSize(${pageSize})/Member(${id})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    data: [],
    loading: false,
    error: '',
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getAllNotify.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllNotify.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data.notifications || []
        state.totalPages = action.payload.data.totalPages
      })
      .addCase(getAllNotify.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default notificationSlice.reducer
