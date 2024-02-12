import apiClient from "./api-client";

class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }


    getAllUsers() {
        const controller = new AbortController();
        const request = apiClient.get('/users', 
            {signal: controller.signal });
        return { request, cancel: () => controller.abort() };
    }
    deleteUser(id: number) {
        return apiClient.delete('/users/' + id);
    }
    updateUser(user: User) {
        return apiClient.patch('/users', user)
    }
}