import apiClient from "./api-client";

interface Entity {
    id: number;
}

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
    delete<T extends Entity>(entity: T) {
        return apiClient.delete(this.endpoint + entity.id)
    }
    update<T extends Entity>(entity: T) {
        return apiClient.patch(this.endpoint + entity.id, entity)
    }
}

export default new HttpService();