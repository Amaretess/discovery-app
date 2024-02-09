import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}

class userService {
    getAllUsers() {
        const controller = new AbortController();
        const request = apiClient.get<User[]>('/users', {signal: controller.signal } )
        
        return { request, cancel: () => controller.abort() };
    }
    deleteUsers(id: number) {
        return apiClient.delete(`/users/${id}`)
    }
}

export default new userService();