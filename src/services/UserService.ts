import UserInterface from '../interfaces/UserInterface';
import UserRepository from '../repositories/UserRepository';

class UserService {
    async create(user: UserInterface) {
        return await UserRepository.create(user);
    }

    async get(email: string) {
        return await UserRepository.findOne({ email: email })
    }
}

export default new UserService();
