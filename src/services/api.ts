import axios from 'axios'


const api = axios.create({
    // baseURL: 'http://192.168.1.151:3333'
    baseURL: 'http://192.168.3.4:3333'
})

export { api }