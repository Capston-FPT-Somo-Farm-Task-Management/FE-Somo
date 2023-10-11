import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

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

export const getPlantActive = createAsyncThunk(
  'plants/getPlantActive',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Plant/Active', {
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

export const createPlant = createAsyncThunk(
  'plants/createPlant',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/Plant', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(baseUrl + `/Plant/Delete/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
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
      //getPlant
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

      // getPlantActive
      .addCase(getPlantActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlantActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getPlantActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createPlant.pending, (state) => {
        state.loading = true
      })
      .addCase(createPlant.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createPlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deletePlant.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.loading = false
        toast.success(`Xoá thành công`)
        state.data = action.payload
      })
      .addCase(deletePlant.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default plantSlice.reducer
