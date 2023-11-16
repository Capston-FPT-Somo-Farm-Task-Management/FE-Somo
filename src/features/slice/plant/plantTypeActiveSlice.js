import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { baseUrl } from 'features/api/baseUrl'

const axiosInstance = createAxiosInstance()

export const getPlantTypeActive = createAsyncThunk(
  'plantTypeActive/getPlantTypeActive',
  async (farmId, { rejectWithValue }) => {
    console.log(farmId)
    try {
      const { data } = await axiosInstance.get(
        `/HabitantType/PlantType/Active/Farm(${farmId})`
      )
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const plantTypeActiveSlice = createSlice({
  name: 'plantTypeActive',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder

      .addCase(getPlantTypeActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getPlantTypeActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getPlantTypeActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default plantTypeActiveSlice.reducer
