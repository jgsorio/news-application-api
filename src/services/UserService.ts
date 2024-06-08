import UserInterface from '../interfaces/UserInterface';
import UserRepository from '../repositories/UserRepository';
import NewsRepository from '../repositories/NewsRepository';

class UserService {
    async create(user: UserInterface) {
        return await UserRepository.create(user);
    }

    async get(email: string) {
        return await UserRepository.findOne({ email: email })
    }

    async getAll(author: string) {
        return await NewsRepository.find({ author });
    }
}

export default new UserService();
