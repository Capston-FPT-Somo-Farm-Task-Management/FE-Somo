import axios from 'axios'
import { baseUrl } from './baseUrl'

export const createAxiosInstance = () => {
  const token = localStorage.getItem('somoFarm')

  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return instance
}
