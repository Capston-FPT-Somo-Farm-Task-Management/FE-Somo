import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getFieldAnimal = createAsyncThunk(
  'fieldAnimal/getFieldAnimal',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Field/Livestock/Active', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const fieldAnimalSlice = createSlice({
  name: 'fieldAnimal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getFieldAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldAnimalSlice.reducer
