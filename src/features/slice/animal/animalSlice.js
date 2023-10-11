import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

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

export const getAnimalActive = createAsyncThunk(
  'plants/getAnimalActive',
  async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Livestock/Active', {
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
      return response.data.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteAnimal = createAsyncThunk(
  'animals/deleteAnimal',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(baseUrl + `/Livestock/Delete/${id}`)
      return response.data
    } catch (error) {
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

      .addCase(deleteAnimal.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.loading = false
        toast.success(`Xoá thành công`)
        state.data = action.payload
      })
      .addCase(deleteAnimal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default animalSlice.reducer
