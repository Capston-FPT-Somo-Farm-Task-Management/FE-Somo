import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'

const axiosInstance = createAxiosInstance()

export const getEmployeeExcel = createAsyncThunk(
  'employeeExcel/getEmployeeExcel',
  async (id, { rejectWithValue }) => {
    try {
      axiosInstance.defaults.headers.common['Accept'] =
        'application/vnd.ms-excel'

      const response = await axiosInstance.get(`/Employee/Export/${id}`, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url
      // Đặt tên file cho đường link tải xuống
      link.setAttribute('download', 'DanhSachNhanVien.xlsx')
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

const employeeExcelSlice = createSlice({
  name: 'employeeExcel',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getEmployeeExcel.pending, (state) => {
        state.loading = true
      })
      .addCase(getEmployeeExcel.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getEmployeeExcel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default employeeExcelSlice.reducer
