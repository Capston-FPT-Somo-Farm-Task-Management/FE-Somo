import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const createField = createAsyncThunk(
  'fields/createField',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/Field', data, {
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

const fieldSlice = createSlice({
  name: 'field',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(createField.pending, (state) => {
        state.loading = true
      })
      .addCase(createField.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
        toast.success(`Thêm mới thành công ${action.payload.name}`)
      })
      .addCase(createField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default fieldSlice.reducer
