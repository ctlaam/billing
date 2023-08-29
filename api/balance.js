import axios from 'axios'
const baseURL = process.env.BASE_URL

export function getPhoto(namebank, data) {
    const url = `${baseURL}/api/${namebank}/balance/`
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((response) => {
                reject(response.response.data.message)
            })
    })
}