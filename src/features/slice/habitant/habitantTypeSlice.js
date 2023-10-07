import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const createHabitantType = createAsyncThunk(
  'habitantType/createHabitantType',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/HabitantType', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const habitantTypeSlice = createSlice({
  name: 'animalType',
  initialState: {
    data: {},
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(createHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(createHabitantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default habitantTypeSlice.reducer
