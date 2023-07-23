export default function ({ $axios, redirect, store }) {
  console.log(store,'store')
  console.log($axios,'axios')

  $axios.interceptors.request.use(
    (config) => {
      const excludedEndpoints = [
        '/login',
        '/register',
        '/logout',
        '/login/login1',
      ]
      // Lấy Bearer Token từ Vuex Store
      const token = store.state.auth.accessToken
      console.log(token, 'token')

      // Nếu tồn tại Bearer Token, thêm vào tiêu đề "Authorization" của yêu cầu Axios
      if (
        !isAuthenticated &&
        route.path !== '/auth' &&
        route.path !== '/auth/signup'
      ) {
        // Chuyển hướng đến /auth/signup
        return redirect('/auth')
      }
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
      return Promise.reject(error)
    }
  )
}
