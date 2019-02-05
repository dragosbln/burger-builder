import axios from 'axios'

const instance = axios.create({
    baseURL: "https://burgerbuilder-372c2.firebaseio.com/"
})

export default instance;