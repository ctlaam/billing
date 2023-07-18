
// Hàm wrapper để gọi API bằng Promise
function callApi(url, method = 'GET', data = null) {
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
