import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getZones = createAsyncThunk('zones/getZones', async () => {
  try {
    const { data } = await axios.get(baseUrl + '/Zone')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getZoneByAreaPlant = createAsyncThunk(
  'zones/getZoneByAreaPlant',
  async (areaId) => {
    try {
      const { data } = await axios.get(baseUrl + `/Zone/AreaPlant(${areaId})`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
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
      .addCase(getZones.pending, (state) => {
        state.loading = true
      })
      .addCase(getZones.fulfilled, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.data = action.payload
      })
      .addCase(getZones.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getZoneByAreaPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneByAreaPlant.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getZoneByAreaPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default zoneSlice.reducer
