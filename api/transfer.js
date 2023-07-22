import api from './commonapi'
// Hàm wrapper để gọi API bằng Promise
export function callFunction(url, method = 'POST', data = null) {
  console.log('transfer');
  return new Promise((resolve, reject) => {
    api
      .request({ url, method, data })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


// export function signup(url, method = 'POST', data = null) {
//   return new Promise((resolve, reject) => {
//     api
//       .request({ url, method, data })
//       .then((response) => {
//         resolve(response.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }
