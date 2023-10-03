import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getPlants = createAsyncThunk('plants/getPlants', async () => {
  try {
    const { data } = await axios.get(baseUrl + '/Plant', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
})

export const createPlant = createAsyncThunk(
  'plants/createPlant',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axios.post(baseUrl + '/Plant', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
      })
      // const result = await response.json()
      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const plantSlice = createSlice({
  name: 'plant',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getPlants.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlants.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getPlants.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(createPlant.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(createPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default plantSlice.reducer
