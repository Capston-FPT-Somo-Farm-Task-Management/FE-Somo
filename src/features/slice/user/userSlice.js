import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'
import { authServices } from 'services/authServices'

export const postLogin = createAsyncThunk(
  'user/postLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseUrl + '/login', data)
      console.log(response.data.accessToken)
      localStorage.setItem('somoFarm', response.data.accessToken)
      toast.success('Đăng nhập thành công')
      return response.data
    } catch (error) {
      toast.error('Tài khoản hoặc mật khẩu sai')
      rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: '',
  },
  //   reducers: {
  //     clearPlant: (state) => {
  //       state.data = null
  //     },
  //   },
  extraReducers(builder) {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default userSlice.reducer
