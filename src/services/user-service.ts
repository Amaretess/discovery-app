import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}


class UserService {
    getAllUsers() {
        const controller = new AbortController();

        apiClient
            .get<User[]>('/users', { signal: controller.signal })
    }
}

export default new UserService();