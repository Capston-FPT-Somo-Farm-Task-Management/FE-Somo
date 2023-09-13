import axios from 'axios'

const userFetch = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
  },
})

export default userFetch
