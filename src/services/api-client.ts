import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: ' https://jsonplaceholder.com/users'
})

export { CanceledError }  