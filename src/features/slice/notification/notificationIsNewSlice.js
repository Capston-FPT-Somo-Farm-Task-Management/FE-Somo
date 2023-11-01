import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { authServices } from 'services/authServices'

export const getNotifyIsNewById = createAsyncThunk(
  'notificationIsNew/getNotifyIsNewById',
  async ({ pageNumber, pageSize, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        baseUrl +
          `/Notification/PageIndex(${pageNumber})/PageSize(${pageSize})/NotSeen/Member${id}`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const changeAllNotifyNewToRead = createAsyncThunk(
  'notificationIsNew/changeAllNotifyNewToRead',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        baseUrl + `/Notification/IsNew/MemberId(${data})`
      )
      if (response.status === 200) {
        console.log('Đổi thành công tất cả')
      }
      return response.json()
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const notificationIsNewSlice = createSlice({
  name: 'notificationIsNew',
  initialState: {
    data: [],
    loading: false,
    error: '',
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getNotifyIsNewById.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotifyIsNewById.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data.notifications || []
        state.totalPages = action.payload.data.totalPages
      })
      .addCase(getNotifyIsNewById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(changeAllNotifyNewToRead.pending, (state) => {
        state.loading = true
      })
      .addCase(changeAllNotifyNewToRead.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(changeAllNotifyNewToRead.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default notificationIsNewSlice.reducer
