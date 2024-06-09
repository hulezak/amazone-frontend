import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://amazon-api-deploy-7r7q.onrender.com'
})

export {axiosInstance}