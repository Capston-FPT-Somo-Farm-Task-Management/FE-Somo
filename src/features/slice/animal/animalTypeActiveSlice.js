import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAnimalTypeActive = createAsyncThunk(
  'animalTypeActive/getAnimalTypeActive',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        baseUrl + `/HabitantType/LivestockType/Active/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const animalTypeActiveSlice = createSlice({
  name: 'animalTypeActive',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAnimalTypeActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalTypeActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalTypeActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default animalTypeActiveSlice.reducer
