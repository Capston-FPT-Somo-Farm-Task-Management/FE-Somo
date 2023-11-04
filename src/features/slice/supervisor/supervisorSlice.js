import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'

export const getSupervisor = createAsyncThunk('supervisor/getSupervisor', async (id) => {
    try {
      const { data } = await axios.get(baseUrl + `/Member/Active/Supervisor/Farm(${id})`)
      console.log(data);
      return data
    } catch (error) {
      console.log(error)
    }
  })

const supervisorSlice = createSlice({
  name: "supervisors",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers(builder) {
    builder

      .addCase(getSupervisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupervisor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
        console.log(action.payload);
      })
      .addCase(getSupervisor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export default supervisorSlice.reducer;
