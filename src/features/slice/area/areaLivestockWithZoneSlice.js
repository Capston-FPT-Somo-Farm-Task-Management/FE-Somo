import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getAreaWithZoneTypeLivestock = createAsyncThunk(
  'areaLivestockByZone/getAreaWithZoneTypeLivestock',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Area/GetAreaWithZoneTypeLiveStock/Farm(${id})`)
      // console.log(data)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const areaLivestockByZoneSlice = createSlice({
  name: 'areaLivestockByZone',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaWithZoneTypeLivestock.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaWithZoneTypeLivestock.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaWithZoneTypeLivestock.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default areaLivestockByZoneSlice.reducer
