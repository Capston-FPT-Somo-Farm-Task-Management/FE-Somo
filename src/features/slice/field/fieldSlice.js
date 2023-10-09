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
      console.log(response.data)
      console.log(response)
      return response.data.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteField = createAsyncThunk(
  'fields/deleteField',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(baseUrl + `/Field/Delete/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
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
        toast.success(`Thêm mới thành công`)
      })
      .addCase(createField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error('Trùng')
      })

      .addCase(deleteField.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        toast.success(`Xoá thành công`)
      })
      .addCase(deleteField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default fieldSlice.reducer
