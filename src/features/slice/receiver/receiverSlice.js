import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getReceiver = createAsyncThunk('receivers/getReceiver', async (farmId) => {
    try {
      const { data } = await axios.get(baseUrl + `/Member/Supervisor/Farm(${farmId})`)
      console.log(data);
      return data
    } catch (error) {
      console.log(error)
    }
  })

const receiverSlice = createSlice({
  name: "receivers",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getReceiver.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReceiver.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
        console.log(action.payload);
      })
      .addCase(getReceiver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default receiverSlice.reducer;
