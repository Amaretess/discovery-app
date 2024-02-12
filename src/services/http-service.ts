import apiClient from "./api-client";


class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, 
            { signal: controller.signal })
        return { request, cancel: () => controller.abort() }

    }
    deleteUser(id: number) {
        return apiClient.delete(this.endpoint + '/' + id)
    }
    updateUser(user: User) {
        return apiClient.patch(this.endpoint + '/' + user.id, user)
    }
    createUser(user: User) {
        return apiClient.post(this.endpoint, user)
    }this.endpoint
}

export default new HttpService();