import axios, { CanceledError } from "axios";

axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users'
})

export CanceledError