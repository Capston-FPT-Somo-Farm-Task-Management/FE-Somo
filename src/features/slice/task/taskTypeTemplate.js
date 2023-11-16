import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getTaskTypeTemplate = createAsyncThunk(
  'taskTypeTemplate/getTaskTypeTemplate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseUrl + '/TaskType/Template', {
        responseType: 'blob',
        headers: {
          Accept: 'application/vnd.ms-excel', 
        },
      })


      const url = window.URL.createObjectURL(new Blob([response.data]))

      const link = document.createElement('a')
      link.href = url

      link.setAttribute('download', 'MaiTaoDiTreXiu.xlsx') 

      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      return response.data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

// export const createTaskType = createAsyncThunk(
//   'taskType/createTaskType',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(baseUrl + '/TaskType', data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       if (response.status === 200) {
//         toast.success(response.data.message)
//         return response.data.data
//       }
//     } catch (error) {
//       toast.error(error.response.data.message)
//       rejectWithValue(error)
//     }
//   }
// )

const taskTypeTemplateSlice = createSlice({
  name: 'taskTypeTemplate',
  initialState: {
    data: [],
    loading: false,
    error: '',
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskTypeTemplate.pending, (state) => {
        state.loading = true
      })
      .addCase(getTaskTypeTemplate.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getTaskTypeTemplate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.data = []
      })

    //   .addCase(createTaskType.pending, (state) => {
    //     state.loading = true
    //   })
    //   .addCase(createTaskType.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.data = [action.payload]
    //   })
    //   .addCase(createTaskType.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.payload
    //   })
  },
})

export default taskTypeTemplateSlice.reducer
