import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getTaskTypeExcel = createAsyncThunk(
  'taskTypeExcel/getTaskTypeExcel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUrl + '/TaskType/Export', {
        responseType: 'blob',
        headers: {
          Accept: 'application/vnd.ms-excel',
        },
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url
      // Đặt tên file cho đường link tải xuống
      link.setAttribute('download', 'ChacTamTruaTaoMoiLen.xlsx')
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
