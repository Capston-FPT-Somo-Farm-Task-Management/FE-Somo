import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getMaterial = createAsyncThunk(
  'materials/getMaterials',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Material', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const createMaterial = createAsyncThunk(
  'materials/createMaterial',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/Material', data, {
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
      rejectWithValue(error)
    }
  }
)

export const updateMaterial = createAsyncThunk(
  'materials/updateMaterial',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Material/${data.id}`, data, {
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

export const deleteMaterial = createAsyncThunk(
  'materials/deleteMaterial',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Material/Delete/${id}`)
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

const materialSlice = createSlice({
  name: 'material',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(getMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteMaterial.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default materialSlice.reducer
