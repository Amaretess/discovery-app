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
    delete(id: number) {
        return apiClient.delete(this.endpoint + '/' + id)
    }
    update(user: User) {
        return apiClient.patch(this.endpoint + '/' + user.id, user)
    }
    create(user: User) {
        return apiClient.post(this.endpoint, user)
    }this.endpoint
}

export default new HttpService();