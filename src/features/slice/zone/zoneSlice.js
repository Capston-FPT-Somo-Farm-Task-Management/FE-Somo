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
    console.log(data)
    try {
      const response = await axios.post(baseUrl + '/Zone', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteZone = createAsyncThunk(
  'areas/deleteZone',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(baseUrl + `/Zone/Delete/${id}`)
      return response.data
    } catch (error) {
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

      .addCase(deleteZone.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteZone.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        toast.success(`Xoá thành công`)
      })
      .addCase(deleteZone.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default zoneSlice.reducer
