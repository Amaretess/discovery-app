import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}


class UserService {
    getAllUsers() {
        const controller = new AbortController();
        const response = apiClient.get<User[]>('/users', { signal: .signal} );
        return { response, cancel: () => controller.abort() } 
    }
}

export default new UserService();

