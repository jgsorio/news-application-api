import UserRepository from "../repositories/UserRepository";

class LoginService {

    async login(email: string) {
        return await UserRepository.findOne({email});
    }
}

export default new LoginService();
