import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getMember = createAsyncThunk('members/getMembers', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/Member', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })

const memberSlice = createSlice({
  name: "members",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
        console.log(action.payload);
      })
      .addCase(getMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default memberSlice.reducer;
