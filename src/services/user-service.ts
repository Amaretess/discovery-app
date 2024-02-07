import axios from "axios";

interface User {
    id: number;
    name: string;
}


class UserService {
    getAllUsers() {
        const response = axios.get('https://jsonplaceholder.typicode.com/users');
        const cancel = new AbortController();
        return { response, cancel: cancel.abort() } 
    }
}

export default new UserService();

