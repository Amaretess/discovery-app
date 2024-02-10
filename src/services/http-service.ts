import apiClient from "./api-client";


class HttpService {

    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }


    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {signal: controller.signal } )
        
        return { request, cancel: () => controller.abort() };
    }
    delete<T>(id: number) {
        return apiClient.delete(`/users/${id}`)
    }
    update<T>(user: User) {
        return apiClient.patch(`/users/${user.id}`, user)
    }
}