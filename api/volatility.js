import axios from 'axios'
const baseURL = process.env.BASE_URL


export function getBillInfo(namebank) {
    const url = `${baseURL}/api/${namebank}/bill_info/`
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
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


export function listBankChange(namebank) {
    const url = `${baseURL}/api/${namebank}/bank_change/`
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
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
