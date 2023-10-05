import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getMaterial = createAsyncThunk('materials/getMaterials', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Material', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

const materialSlice = createSlice({
  name: "materials",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getMaterial.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
        console.log(action.payload);
      })
      .addCase(getMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default materialSlice.reducer;
