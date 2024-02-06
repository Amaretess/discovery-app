import apiClient from "./api-client";

class UserService {
    getAllUsers() {
        apiClient.get('/users')
    }
}
// classed based programming; 
export default new UserService()