import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getZoneType = createAsyncThunk(
  'zoneType/getZoneType',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/ZoneType')
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const zoneTypeSlice = createSlice({
  name: 'zoneType',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getZoneType.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneType.fulfilled, (state, action) => {
        state.loading = false
        state.error = action.error
        state.data = action.payload
      })
      .addCase(getZoneType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default zoneTypeSlice.reducer
