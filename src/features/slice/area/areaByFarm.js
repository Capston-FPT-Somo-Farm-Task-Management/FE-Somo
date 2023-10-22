import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getAreaByFarmId = createAsyncThunk(
  'areas/getAreaByFarmId',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Area/Farm(${id})`)
      return data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

const areaByFarmSlice = createSlice({
  name: 'areaByFarm',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearAreaByFarm: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

    //   .addCase(deleteArea.pending, (state) => {
    //     state.loading = true
    //   })
    //   .addCase(deleteArea.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.data = action.payload
    //   })
    //   .addCase(deleteArea.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.payload
    //   })
  },
})

export default areaByFarmSlice.reducer
export const { clearAreaByFarm } = areaByFarmSlice.actions
