import axios from "axios";
import apiClient from "./api-client";

interface User {
    id: number;
    name: string;
}


class UserService {
    getAllUsers() {
        const response = apiClient.get('/users');
        const cancel = new AbortController();
        return { response, cancel: cancel.abort() } 
    }
}

export default new UserService();

