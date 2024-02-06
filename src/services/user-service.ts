import apiClient from "./api-client";

class UserService {
    getAllUsers() {
        apiClient.get('/users')
            .then(({data: allUsers} ))
    }
}