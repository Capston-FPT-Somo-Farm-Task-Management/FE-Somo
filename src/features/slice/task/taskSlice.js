import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from 'features/api/baseUrl'
import { toast } from 'react-toastify'

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
    try {
      const { data } = await axios.get(baseUrl + '/FarmTask/TaskActive', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    } catch (error) {
      console.log(error)
    }
  })
// export const getTaskById = createAsyncThunk('tasks/getTaskById', async (taskId) => {
//     try {
//       const { data } = await axios.get(baseUrl + `/FarmTask/${taskId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       return data
//     } catch (error) {
//       console.log(error)
//     }
//   })

  export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (data) => {
      console.log(data);
      console.log(data.farmTask.memberId);
      try {
        const response = await axios.post(baseUrl + `/FarmTask?memberId=5`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw error; 
      }
    }
  );

  export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
      console.log(id)
      try {
        const response = await axios.put(baseUrl + `/FarmTask/ChangeStatus/${id}`, { status: 4 },)
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

  const taskSlice = createSlice({
    name: 'task',
    initialState: {
      data: [],
      loading: false,
      error: '',
    },
    extraReducers(builder) {
      builder
        .addCase(getTasks.pending, (state) => {
          state.loading = true
        })
        .addCase(getTasks.fulfilled, (state, action) => {
          state.loading = false
          state.error = ''
          state.data = action.payload
        })
        .addCase(getTasks.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
          state.data = []
        })
        // .addCase(getTaskById.pending, (state) => {
        //   state.loading = true
        // })
        // .addCase(getTaskById.fulfilled, (state, action) => {
        //   state.loading = false
        //   state.error = ''
        //   state.data = action.payload
        // })
        // .addCase(getTaskById.rejected, (state, action) => {
        //   state.loading = false
        //   state.error = action.payload
        //   state.data = []
        // })
  
        .addCase(createTask.pending, (state) => {
          state.loading = true
        })
        .addCase(createTask.fulfilled, (state, action) => {
          if (Array.isArray(state.data)) {
            state.data.push(action.payload.task) 
          } else {
            state.data = [action.payload.task]
          }
        
          state.loading = false
        })
        .addCase(createTask.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
        .addCase(deleteTask.pending, (state) => {
          state.loading = true
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.loading = false
          state.data = action.payload
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
    },
  })

  export default taskSlice.reducer