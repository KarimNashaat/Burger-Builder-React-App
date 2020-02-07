import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-app-3c9e2.firebaseio.com/'
})

export default instance