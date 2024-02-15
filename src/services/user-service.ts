import create from "./http-service";

export interface User {
    id: number;
    name: string;
}

class UserService {

}

export default create('/users');