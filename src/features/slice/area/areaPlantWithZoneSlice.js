import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getAreaWithZoneTypePlant = createAsyncThunk(
  'areaPlantByZone/getAreaWithZoneTypePlant',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Area/GetAreaWithZoneTypePlant/Farm(${id})`)
      // console.log(data)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const areaPlantByZoneSlice = createSlice({
  name: 'areaPlantByZone',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaWithZoneTypePlant.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaWithZoneTypePlant.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaWithZoneTypePlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default areaPlantByZoneSlice.reducer
