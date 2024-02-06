import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}

class UserService {
    getAllUsers() {
        apiClient.get<User[]>('/users')
    }
}
// classed based programming; 
export default new UserService()