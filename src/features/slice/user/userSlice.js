import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createAxiosInstance } from 'features/api/axiosInstance'
import { toast } from 'react-toastify'

const axiosInstance = createAxiosInstance()

export const postLogin = createAsyncThunk(
  'user/postLogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', data)
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
