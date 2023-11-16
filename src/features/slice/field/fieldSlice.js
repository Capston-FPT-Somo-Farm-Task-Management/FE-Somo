import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const createField = createAsyncThunk(
  'fields/createField',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/Field', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        toast.success(response.data.message)
        return response.data.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getFields = createAsyncThunk(
  'fields/getFields',
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + '/Field/Active', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(data)
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const updateField = createAsyncThunk(
  'fields/updateField',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Field/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.json()
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const deleteField = createAsyncThunk(
  'fields/deleteField',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Field/Delete/${id}`)
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

export const adminDeleteField = createAsyncThunk(
  'fields/adminDeleteField',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseUrl + `/Field/${id}`)
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
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

      .addCase(getFields.pending, (state) => {
        state.loading = true
      })
      .addCase(getFields.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFields.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createField.pending, (state) => {
        state.loading = true
      })
      .addCase(createField.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(createField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateField.pending, (state) => {
        state.loading = true
      })
      .addCase(updateField.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteField.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteField.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteField.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default fieldSlice.reducer
