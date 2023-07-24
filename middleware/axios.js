import axios from 'axios'

export default function ({ store }) {
  // Đăng ký một interceptor onRequest để thực hiện tác vụ trước khi gọi API
  // /plugins/axios.js
  axios.interceptors.request.use(
    (config) => {
      const excludedEndpoints = [
        '/auth',
        '/auth/login',
      ]
      // Lấy Bearer Token từ Vuex Store
      const token = store.state.auth.accessToken    

      // Nếu tồn tại Bearer Token, thêm vào tiêu đề "Authorization" của yêu cầu Axios
      if (
        !excludedEndpoints.some((endpoint) => config.url.includes(endpoint))
      ) {
        // const token = this.$store.state.auth.accessToken
        config.headers.Authorization = `Bearer ${token}`
      }

      // Trả về config đã được cập nhật
      return config
    },
    (error) => {
      console.log(err);
      return Promise.reject(error)
    }
  )
}
