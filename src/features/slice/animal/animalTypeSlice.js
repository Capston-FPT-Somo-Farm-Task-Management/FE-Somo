import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAnimalType = createAsyncThunk(
  'animalTypes/getAnimalTypes',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/HabitantType/LivestockType')
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const animalTypeSlice = createSlice({
  name: 'animalType',
  initialState: {
    data: {},
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAnimalType.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalType.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default animalTypeSlice.reducer
