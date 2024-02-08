import apiClient from "./api-client"

interface Comment {
    
}

class commentService {
    getAllComments() {
        apiClient.get<Comment[]>('/comments')
    }
}

export default new commentService()