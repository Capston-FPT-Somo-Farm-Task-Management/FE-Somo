import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getZoneActive = createAsyncThunk(
  'zones/getZoneActive',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Zone/Active')
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const createZone = createAsyncThunk(
  'zones/createZone',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/Zone', data, {
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

export const updateZone = createAsyncThunk(
  'zones/updateZone',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axios.put(baseUrl + `/Zone/${data.id}`, data, {
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

export const deleteZone = createAsyncThunk(
  'zones/deleteZone',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(baseUrl + `/Zone/Delete/${id}`)
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

export const adminDeleteZone = createAsyncThunk(
  'zones/adminDeleteZone',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseUrl + `/Zone/${id}`)
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

const zoneSlice = createSlice({
  name: 'zone',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = action.error
        state.data = action.payload
      })
      .addCase(getZoneActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createZone.pending, (state) => {
        state.loading = true
      })
      .addCase(createZone.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createZone.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateZone.pending, (state) => {
        state.loading = true
      })
      .addCase(updateZone.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateZone.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteZone.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteZone.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteZone.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default zoneSlice.reducer
