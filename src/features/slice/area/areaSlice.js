import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getAreaActive = createAsyncThunk(
  'areas/getAreaActive',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Area/Active/Farm(${id})`)
      // console.log(data)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const createArea = createAsyncThunk(
  'areas/createArea',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/Area', data, {
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

export const updateArea = createAsyncThunk(
  'areas/updateArea',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Area/${data.id}`, data, {
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

export const deleteArea = createAsyncThunk(
  'areas/deleteArea',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Area/Delete/${id}`)
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

export const adminDeleteArea = createAsyncThunk(
  'areas/adminDeleteArea',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseUrl + `/Area/${id}`)
      if (response.status === 200) {
        toast.success(response.data.message)
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const areaSlice = createSlice({
  name: 'area',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearArea: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createArea.pending, (state) => {
        state.loading = true
      })
      .addCase(createArea.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createArea.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateArea.pending, (state) => {
        state.loading = true
      })
      .addCase(updateArea.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateArea.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteArea.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteArea.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteArea.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(adminDeleteArea.pending, (state) => {
        state.loading = true
      })
      .addCase(adminDeleteArea.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(adminDeleteArea.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default areaSlice.reducer
export const { clearArea } = areaSlice.actions
