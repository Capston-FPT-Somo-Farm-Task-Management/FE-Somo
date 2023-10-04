import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getZoneByAreaAnimal = createAsyncThunk(
  'zoneAnimal/getZoneByAreaAnimal',
  async (areaId) => {
    try {
      const { data } = await axios.get(
        baseUrl + `/Zone/AreaLivestock(${areaId})`
      )
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const zoneAnimalSlice = createSlice({
  name: 'zoneAnimal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getZoneByAreaAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(getZoneByAreaAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
        console.log(action.payload)
      })
      .addCase(getZoneByAreaAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default zoneAnimalSlice.reducer
