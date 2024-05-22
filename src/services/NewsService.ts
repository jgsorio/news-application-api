import { NewsInterface } from '../interfaces/NewsInterface';
import NewsRepository from '../repositories/NewsRepository';

class NewsService {
    async getAll() {
        return await NewsRepository.find({});
    }

    async getById(id: string) {
        return await NewsRepository.findById(id);
    }

    async create(news: NewsInterface) {
        return await NewsRepository.create(news);
    }

    async update(id: string, news: NewsInterface) {
        return await NewsRepository.findByIdAndUpdate({ _id: id }, news, { new: true });
    }

    async delete(id: string) {
        return await NewsRepository.findByIdAndDelete({ _id: id });
    }
}

export default new NewsService();
