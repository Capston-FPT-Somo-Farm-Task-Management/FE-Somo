import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getZoneByAreaPlant = createAsyncThunk(
    'zonePlant/getZoneByAreaPlant',
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

const zonePlantSlice = createSlice({
    name: 'zonePlant',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        
  
        .addCase(getZoneByAreaPlant.pending, (state) => {
          state.loading = true
        })
        .addCase(getZoneByAreaPlant.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
          console.log(action.payload);
        })
        .addCase(getZoneByAreaPlant.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
  
        
    },
  })

  export default zonePlantSlice.reducer;