import apiClient from "./api-client";



class userService {
    getAllUsers() {
        const controller = new AbortController();
        const request = apiClient.get('/users', {signal: controller.signal } )
        
        return { request, cancel: () => controller.abort() };

    }
}

export default new userService();