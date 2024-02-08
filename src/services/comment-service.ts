import apiClient from "./api-client"

export interface Comment {
    id: number;
    name: string;
    email: string;
}

class CommentService {
    getAllComments() {
        const controller = new AbortController();

        const request = apiClient.get<Comment[]>('/comments', { signal: controller.signal } )
        const cancel = controller.abort();
        return { request, cancel: () => cancel }
    }
}

export default new CommentService();