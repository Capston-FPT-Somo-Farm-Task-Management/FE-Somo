import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskDoneByEmployeeId = createAsyncThunk(
  'taskDone/getTaskDoneByEmployeeId',
  async ({ pageIndex, employeeId, startDay, endDay }, { rejectWithValue }) => {
    try {
      //   const formattedDate = date ? date.toISOString().split('T')[0] : ''
      const url = new URL(
        `/api/FarmTask/PageIndex(${pageIndex})/PageSize(10)/Done/Employee(${employeeId})`,
        axiosInstance.defaults.baseURL
      )

      // Kiểm tra và thêm startDay và endDay vào query param nếu chúng không phải là null hoặc undefined
      if (startDay != null) url.searchParams.append('startDay', startDay)
      if (endDay != null) url.searchParams.append('endDay', endDay)
      console.log(url)
      // Gọi API với URL có chứa hoặc không chứa startDay và endDay
      const { data } = await axiosInstance.get(url.href)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const taskDoneSlice = createSlice({
  name: 'taskDone',
  initialState: {
    data: [],
    loading: false,
    error: '',
    totalPages: 0,
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskDoneByEmployeeId.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskDoneByEmployeeId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload.data.taskByEmployeeDates || []
        state.totalPages = action.payload.data.totalPages
      })
      .addCase(getTaskDoneByEmployeeId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskDoneSlice.reducer
