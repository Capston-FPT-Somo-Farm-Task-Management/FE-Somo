import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

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

export const updateHabitantType = createAsyncThunk(
  'habitantType/updateHabitantType',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axios.put(
        baseUrl + `/HabitantType/${data.id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.json()
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteHabitantType = createAsyncThunk(
  'habitantType/deleteHabitantType',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/HabitantType/Delete/${id}`)
      if (response.status === 200) {
        toast.success(response.data.message)
      } else if (response.status === 400) {
        toast.warning(response.message)
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
    }
  }
)
const habitantTypeSlice = createSlice({
  name: 'animalType',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearHabitantType: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder

      .addCase(createHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(createHabitantType.fulfilled, (state, action) => {
        state.loading = false
        toast.success('Tạo mới thành công')
        state.data = action.payload
      })
      .addCase(createHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(updateHabitantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteHabitantType.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteHabitantType.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteHabitantType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default habitantTypeSlice.reducer
export const { clearHabitantType } = habitantTypeSlice.actions
