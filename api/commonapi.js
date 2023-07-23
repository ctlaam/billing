import axios from 'axios'
// Tạo instance Axios với các cấu hình mặc định
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  // Các cấu hình khác...
})
// Thêm interceptor để chèn Bearer Token vào các yêu cầu trừ login, signup, logout và /login/login1
api.interceptors.request.use(
  (config) => {
    const excludedEndpoints = [
      '/login',
      '/register',
      '/logout',
      '/login/login1',
    ]
    if (!excludedEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      // const token = this.$store.state.auth.accessToken
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error);
    return Promise.reject(error)
  }
)

export default api
