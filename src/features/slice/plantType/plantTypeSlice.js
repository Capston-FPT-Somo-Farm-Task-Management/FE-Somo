import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getPlantType = createAsyncThunk(
  'plantTypes/getPlantTypes',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/HabitantType/PlantType')
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const plantTypeSlice = createSlice({
  name: 'plantType',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getPlantType.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlantType.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getPlantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default plantTypeSlice.reducer
