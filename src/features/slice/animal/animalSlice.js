import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAnimals = createAsyncThunk('animals/getAnimals', async () => {
  try {
    const { data } = await axios.get(baseUrl + '/Livestock', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
})

export const createAnimal = createAsyncThunk(
  'animals/createAnimal',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axios.post(baseUrl + '/Livestock', data, {
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

const animalSlice = createSlice({
  name: 'animal',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAnimals.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(createAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default animalSlice.reducer
