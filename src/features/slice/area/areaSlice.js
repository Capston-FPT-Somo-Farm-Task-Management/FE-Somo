import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getAreaActive = createAsyncThunk(
  'areas/getAreaActive',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Area/Active')
      // console.log(data)
      return data
    } catch (error) {
      throw error
    }
  }
)

export const deleteArea = createAsyncThunk(
  'areas/deleteArea',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(baseUrl + `/Area/Delete/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const areaSlice = createSlice({
  name: 'area',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getAreaActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getAreaActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAreaActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(deleteArea.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteArea.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        toast.success(`Xoá thành công`)
      })
      .addCase(deleteArea.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default areaSlice.reducer
