import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getZoneByAreaLivestock = createAsyncThunk(
    'zoneLivestock/getZoneByAreaLivestock',
    async (areaId) => {
      try {
        const { data } = await axios.get(baseUrl + `/Zone/AreaLivestock(${areaId})`)
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
      }
    }
  )

const zoneLivestockSlice = createSlice({
    name: 'zoneLivestock',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        
  
        .addCase(getZoneByAreaLivestock.pending, (state) => {
          state.loading = true
        })
        .addCase(getZoneByAreaLivestock.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
          console.log(action.payload);
        })
        .addCase(getZoneByAreaLivestock.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
  
        
    },
  })

  export default zoneLivestockSlice.reducer;