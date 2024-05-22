import UserInterface from '../interfaces/UserInterface';
import UserRepository from '../repositories/UserRepository';

class UserService {
    async create(user: UserInterface) {
        return await UserRepository.create(user);
    }
}

export default new UserService();
