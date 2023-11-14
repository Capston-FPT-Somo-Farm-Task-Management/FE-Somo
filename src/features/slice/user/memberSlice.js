import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getMemberById = createAsyncThunk(
  'member/getMemberById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUrl + `/member/${id}`)
      return response.data.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const getMemberByFarmId = createAsyncThunk(
  'member/getMemberByFarmId',
  async (farmId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(baseUrl + `/Member/Farm(${farmId})`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const adminDeleteMember = createAsyncThunk(
  'member/adminDeleteMember',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id)
      const response = await axios.delete(baseUrl + `/Member/${id}`)
      if (response.status === 200) {
        toast.success('Xoá thành công')
        return response.data
      }
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearMember: (state) => {
      state.data = null
    },
  },

  extraReducers(builder) {
    builder

      .addCase(getMemberById.pending, (state) => {
        state.loading = true
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(getMemberByFarmId.pending, (state) => {
        state.loading = true
      })
      .addCase(getMemberByFarmId.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getMemberByFarmId.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(adminDeleteMember.pending, (state) => {
        state.loading = true
      })
      .addCase(adminDeleteMember.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(adminDeleteMember.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default memberSlice.reducer
export const { clearMember } = memberSlice.actions
