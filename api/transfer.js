import axios from 'axios'
const baseURL = process.env.BASE_URL
export function logIn(data) {
  const url = `${baseURL}/auth/login/`
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch((response) => {
        reject(response.message)
      })
  })
}

export function getPhoto(data) {
  const url = `${baseURL}/app/get_photo/`
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response)
        resolve(response.data)
      })
      .catch((response) => {
        reject(response.response.data.message)
      })
  })
}
