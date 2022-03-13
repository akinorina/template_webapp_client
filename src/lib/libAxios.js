import axios from 'axios'

console.log('import.meta.env.VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL);

// axios
const axiosC = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

export default axiosC
