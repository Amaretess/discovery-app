

export interface User {
    id: number;
    name: string;
  }

class apiServices {
    getAllUsers() {
        .get<User[]>('/users', { signal: controller.signal })
    }
}