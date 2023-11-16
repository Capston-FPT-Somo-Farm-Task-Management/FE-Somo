import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getTaskTypeExcel = createAsyncThunk(
  'taskTypeExcel/getTaskTypeExcel',
  async (_, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Accept'] =
        'application/vnd.ms-excel'

      const response = await axiosInstance.get('/TaskType/Export', {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url
      // Đặt tên file cho đường link tải xuống
      link.setAttribute('download', 'TaskTypeInFarm.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const taskTypeExcelSlice = createSlice({
  name: 'taskTypeExcel',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getTaskTypeExcel.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskTypeExcel.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskTypeExcel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default taskTypeExcelSlice.reducer
