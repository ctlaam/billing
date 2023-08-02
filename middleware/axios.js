import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'

export default async function ({ store }) {

  // Đăng ký một interceptor onRequest để thực hiện tác vụ trước khi gọi API
  // /plugins/axios.js
  axios.interceptors.request.use(
    async (config) => {
      const excludedEndpoints = [
        '/auth',
        '/auth/login',
      ]
      const timeValid = Cookies.get('time_valid')
      let givenTime = null
      if (timeValid) {
        givenTime = moment(timeValid);
      }
      const currentTime = moment();
      if (timeValid && !givenTime?.isAfter(currentTime)) {
        await axios.post('https://api.fakebill.online/auth/token/refresh/', {
          refreshToken: Cookies.get('refreshToken')
        })
          .then(response => {
            const accessToken = response.data.access;
            store.dispatch('auth/refreshToken', accessToken)
          })
          .catch(error => {
            return redirect('/auth')
          });
      } else {
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
      }

    },
    (error) => {
      console.log(err);
      return Promise.reject(error)
    }
  )
}
