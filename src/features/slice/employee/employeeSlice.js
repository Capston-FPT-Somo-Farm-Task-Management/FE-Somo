import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Employee/ChangeStatus/${id}`)
      if (response.status === 200) {
        toast.success('Đổi trạng thái thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default employeeSlice.reducer
