import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getFieldAnimalByFarmId = createAsyncThunk(
  'fields/getFieldLivestockByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Field/Livestock/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const getFieldPlantByFarmId = createAsyncThunk(
  'fields/getFieldPlantByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Field/Plant/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const fieldByFarmSlice = createSlice({
  name: 'fieldByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearFieldByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFieldAnimalByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldAnimalByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldAnimalByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getFieldPlantByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getFieldPlantByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getFieldPlantByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })
  },
})

export default fieldByFarmSlice.reducer
export const { clearFieldByFarm } = fieldByFarmSlice.actions
