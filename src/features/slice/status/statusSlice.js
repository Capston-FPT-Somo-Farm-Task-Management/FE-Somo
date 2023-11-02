import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getStatus = createAsyncThunk('status/getStatus', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/FarmTask/Status', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

const statusSlice = createSlice({
  name: "status",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default statusSlice.reducer;
