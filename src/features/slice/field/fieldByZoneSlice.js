import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getFieldByZone = createAsyncThunk(
  'fieldPlant/getFieldByZonePlant',
  async (zoneId) => {
    try {
      const { data } = await axios.get(
        baseUrl + `/Field/Active/Zone(${zoneId})`
      )
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const fieldByZoneSlice = createSlice({
  name: 'fieldByZone',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getFieldByZone.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldByZone.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldByZone.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldByZoneSlice.reducer
