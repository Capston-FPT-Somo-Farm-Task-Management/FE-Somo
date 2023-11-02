import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'
import { Exception } from 'sass'

export const getAnimalActive = createAsyncThunk(
  'animals/getAnimalActive',
  async (id) => {
    try {
      const { data } = await axios.get(baseUrl + `/LiveStock/ExternalId/Field(${id})`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      throw Exception(error)
    }
  }
)

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
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.data.data
    } catch (error) {
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const updateAnimal = createAsyncThunk(
  'animals/updateAnimal',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        baseUrl + `/Livestock/${data.id}`,
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
      toast.error(error.response.data.message)
      rejectWithValue(error)
    }
  }
)

export const deleteAnimal = createAsyncThunk(
  'animals/deleteAnimal',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(baseUrl + `/Livestock/Delete/${id}`)
      if (response.status === 200) {
        toast.success(response.data.message)
      }
      return response.data
    } catch (error) {
      toast.error(error.response.data.message)
      return rejectWithValue(error)
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
  reducers: {
    clearAnimal: (state) => {
      state.data = null
    },
  },
  extraReducers(builder) {
    builder
      // getAnimalActive
      .addCase(getAnimalActive.pending, (state) => {
        state.loading = true
      })
      .addCase(getAnimalActive.fulfilled, (state, action) => {
        state.loading = false
        state.error = ''
        state.data = action.payload
      })
      .addCase(getAnimalActive.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

      .addCase(createAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(createAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data = [action.payload]
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default animalSlice.reducer
export const { clearAnimal } = animalSlice.actions
